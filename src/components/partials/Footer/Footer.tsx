import LogoFooter from "@/assets/images/logo-footer.png";

const Footer = () => {
  return (
    <footer className="bg-[#1D1D1D] text-white py-10 mt-20">
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="flex justify-between">
          <div className="flex flex-col gap-4">
            <img src={LogoFooter} alt="Logo" />
            <p>Helping You Build a Winning Resume</p>
          </div>
          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-4 items-end">
              <h3 className="font-bold text-xl">Owners</h3>
              <ul className="flex flex-col items-end text-lg">
                <li>Pramudya Renaldi Salim</li>
                <li>Ahmad Ghozali</li>
                <li>Rahmat Hidayat</li>
                <li>Muhammad Zidane Al Fariz</li>
              </ul>
            </div>
            <div className="flex flex-col gap-4 items-end">
              <h3 className="font-bold text-xl">Company</h3>
              <ul className="flex flex-col items-end text-lg">
                <li>About Us</li>
                <li>Services</li>
                <li>Reviews</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;