CREATE TABLE public.deposit_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  company text CHECK (char_length(company) <= 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 6 AND 30),
  mineral text NOT NULL CHECK (mineral IN ('Gold','Diamonds','Other precious minerals')),
  quantity text NOT NULL CHECK (char_length(quantity) BETWEEN 1 AND 60),
  service text NOT NULL CHECK (service IN ('Vault intake','Custody quote','Secure transport')),
  preferred_date date,
  notes text CHECK (char_length(notes) <= 1000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.deposit_requests TO anon, authenticated;
GRANT ALL ON public.deposit_requests TO service_role;
ALTER TABLE public.deposit_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit deposit requests" ON public.deposit_requests FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE TABLE public.custody_receipts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_number text NOT NULL UNIQUE,
  asset text NOT NULL,
  quantity text NOT NULL,
  status text NOT NULL DEFAULT 'In custody',
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.custody_receipts TO service_role;
ALTER TABLE public.custody_receipts ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.verify_receipt(_code text)
RETURNS TABLE(receipt_number text, asset text, quantity text, status text, updated_at timestamptz)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT receipt_number, asset, quantity, status, updated_at
  FROM public.custody_receipts WHERE receipt_number = upper(trim(_code)) LIMIT 1;
$$;
REVOKE ALL ON FUNCTION public.verify_receipt(text) FROM public;
GRANT EXECUTE ON FUNCTION public.verify_receipt(text) TO anon, authenticated;

INSERT INTO public.custody_receipts (receipt_number, asset, quantity, status, updated_at) VALUES
('CCT-SKR-2026-0001','Gold bullion (99.9%)','25.00 kg','In custody','2026-03-12'),
('CCT-SKR-2026-0002','Rough diamonds','1,240 ct','In custody','2026-06-02'),
('CCT-SKR-2026-0003','Gold dust','8.50 kg','Released','2026-08-21');