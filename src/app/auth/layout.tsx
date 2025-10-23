export default function AuthenticateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='full-space min-h-screen flex items-center justify-center'>
      {children}
    </div>
  );
}
