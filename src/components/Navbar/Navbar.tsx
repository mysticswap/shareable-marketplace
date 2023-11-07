import "./Navbar.css";
import {
  RiArrowDownSLine,
  RiDiscordFill,
  RiMenu3Fill,
  RiTwitterXLine,
} from "react-icons/ri";
import SolidButton from "../SolidButton/SolidButton";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { scrollToTop } from "../../utils";
import { connectWallets } from "../../services/web3Onboard";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import ConnectedWalletButton from "../ConnectedWalletButton/ConnectedWalletButton";
import { useConnectionContext } from "../../context/ConnectionContext/ConnectionContext";
import UserNftsModal from "../UserNftsModal/UserNftsModal";
import { useTransactionContext } from "../../context/TransactionContext/TransactionContext";
import { BsCheck } from "react-icons/bs";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { tabOptions } from "../../constants";
import { useIsMobile } from "../../hooks/useIsMobile";

const Navbar = () => {
  const { setProvider, user } = useConnectionContext()!;
  const {
    collectionMetadata,
    userNfts,
    availableCollections,
    selectedCollection,
    setSelectedCollection,
    setCurrentTab,
    client,
  } = useGlobalContext()!;
  const { setShowOfferOrListingModal } = useTransactionContext()!;
  const location = useLocation();
  const isMobile = useIsMobile();

  const [showUserNftsModal, setShowUserNftsModal] = useState(false);
  const dropdownRef = useRef(null);

  const [showDropdownOptions, setShowDropdownOptions] = useState(false);

  useOutsideClick(
    dropdownRef,
    setShowDropdownOptions,
    "collection_dropdown_trigger"
  );

  const userHasNfts = userNfts?.tokens?.length > 0 && user;

  const discordUrl = collectionMetadata?.collections?.[0]?.discordUrl;
  const twitterUrl = `https://twitter.com/${collectionMetadata?.collections[0]?.twitterUsername}`;

  const connectWallet = () => {
    connectWallets(setProvider);
  };

  useEffect(() => {
    scrollToTop();
    setShowOfferOrListingModal(false);
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <section className="nav_left">
        <div className="logo_holder">
          <Link to="/" onClick={() => setCurrentTab(tabOptions[0])}>
            <img src={client.logoUrl} alt="collection_logo" />
          </Link>
        </div>

        <div className="nav_main_contents">
          <div className="nav_links">
            <a href={discordUrl}>
              <RiDiscordFill size={25} display="block" />
            </a>
            <a href={twitterUrl}>
              <RiTwitterXLine size={20} display="block" />
            </a>
          </div>
          <div className="collections_dropdown">
            <button
              className="collection_dropdown_trigger"
              onClick={() => setShowDropdownOptions(!showDropdownOptions)}
            >
              Collections <RiArrowDownSLine size={20} />
            </button>

            {showDropdownOptions && (
              <div className="collections_dropdown_list" ref={dropdownRef}>
                {availableCollections.map((collection) => {
                  const isSelected =
                    collection.address == selectedCollection.address;

                  return (
                    <Link key={collection.id} to="/">
                      <button
                        onClick={() => {
                          setSelectedCollection(collection);
                          setShowDropdownOptions(false);
                          setCurrentTab(tabOptions[0]);
                        }}
                      >
                        {collection.name}{" "}
                        {isSelected && <BsCheck size={15} display="block" />}
                      </button>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
          {userHasNfts && (
            <button
              className="sell_button"
              onClick={() => setShowUserNftsModal(true)}
            >
              Sell
            </button>
          )}
        </div>
      </section>

      <section className="nav_right">
        {!user ? (
          <SolidButton text="Connect Wallet" onClick={connectWallet} />
        ) : (
          <ConnectedWalletButton />
        )}
        {isMobile && (
          <RiMenu3Fill className="burger_btn" display="block" size={25} />
        )}
      </section>

      {showUserNftsModal && (
        <UserNftsModal setShowUserNftsModal={setShowUserNftsModal} />
      )}
    </nav>
  );
};

export default Navbar;
