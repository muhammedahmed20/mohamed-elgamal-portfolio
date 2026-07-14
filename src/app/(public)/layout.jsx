import Footer from "@/components/footer";
import { Header } from "@/components/sharedComponents/header";


export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer/>
    </>
  );
}