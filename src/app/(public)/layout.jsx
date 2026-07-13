import { Header } from "@/components/sharedComponents/header";


export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}