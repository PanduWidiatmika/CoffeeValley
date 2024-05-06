interface FooterProps {
  date?: string; // Optional date prop
}

const Footer: React.FC<FooterProps> = ({ date }) => {
  return (
    <footer className="footer text-white">
      <div className="items-center">
        <p>All rights reserved. &copy; {date || "Today's Date"}</p>
      </div>
    </footer>
  );
};

export default Footer;
