/*
  # Add Delivery Information to Orders

  1. Changes
    - Add delivery address and contact information to orders table
    - Add delivery status tracking
    - Add estimated delivery time
*/

ALTER TABLE orders
ADD COLUMN delivery_address text,
ADD COLUMN delivery_contact text,
ADD COLUMN delivery_instructions text,
ADD COLUMN estimated_delivery_time timestamptz,
ADD COLUMN delivery_status text DEFAULT 'pending' 
  CHECK (delivery_status IN ('pending', 'preparing', 'out_for_delivery', 'delivered'));

-- Update the status check to include delivery statuses
ALTER TABLE orders DROP CONSTRAINT orders_status_check;
ALTER TABLE orders ADD CONSTRAINT orders_status_check 
  CHECK (status IN ('pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'));