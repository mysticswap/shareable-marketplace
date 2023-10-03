import "./Navbar.css";
import {
  RiArrowDownSLine,
  RiDiscordFill,
  RiTwitterXLine,
} from "react-icons/ri";
import SolidButton from "../SolidButton/SolidButton";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { scrollToTop } from "../../utils";
import { connectWallets } from "../../services/web3Onboard";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import ConnectedWalletButton from "../ConnectedWalletButton/ConnectedWalletButton";

const Navbar = () => {
  const { setProvider, user, collectionMetadata } = useGlobalContext()!;
  const location = useLocation();

  const discordUrl = collectionMetadata?.collections[0].discordUrl;
  const twitterUrl = `https://twitter.com/${collectionMetadata?.collections[0]?.twitterUsername}`;

  const connectWallet = () => {
    connectWallets(setProvider);
  };

  useEffect(() => {
    scrollToTop();
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <section className="nav_left">
        <div className="logo_holder">
          <Link to="/">
            <img
              src="https://mysticswap.io/static/media/mystWizGuild2.824b89cd.png"
              alt="collection_logo"
            />
          </Link>
        </div>

        <div className="nav_links">
          <a href={discordUrl}>
            <RiDiscordFill size={25} display="block" />
          </a>
          <a href={twitterUrl}>
            <RiTwitterXLine size={20} display="block" />
          </a>
        </div>

        <div className="collections_dropdown">
          Collections <RiArrowDownSLine />
        </div>
      </section>
      <section>
        {!user ? (
          <SolidButton text="Connect Wallet" onClick={connectWallet} />
        ) : (
          <ConnectedWalletButton />
        )}
      </section>
    </nav>
  );
};

export default Navbar;
