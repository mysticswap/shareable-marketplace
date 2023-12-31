import { BiLoaderCircle } from "react-icons/bi";
import "./TransactionStages.css";
import { RiTwitterXLine } from "react-icons/ri";
import { useTransactionContext } from "../../context/TransactionContext/TransactionContext";
import { TbExternalLink } from "react-icons/tb";
import { scanWebsites } from "../../constants";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { TwitterShareButton } from "react-share";
import { getHostName } from "../../utils";

type Props = {
  stage: number;
};

const TransactionStages = ({ stage }: Props) => {
  const { transactionHash, transactionNft } = useTransactionContext()!;
  const { collectionChainId } = useGlobalContext();

  return (
    <div className="process_component">
      {stage == 1 && (
        <div className="stage">
          <p>Processing...</p>
          <BiLoaderCircle className="loader" size={50} />
        </div>
      )}

      {stage == 2 && (
        <div className="stage">
          <p>Share it:</p>
          <TwitterShareButton
            title={transactionNft.message}
            url={getHostName()}
          >
            <RiTwitterXLine
              className="twitter_share"
              size={50}
              display="block"
            />
          </TwitterShareButton>
          {transactionHash && (
            <button
              className="modal_transaction_button"
              onClick={() =>
                window.open(
                  `${scanWebsites[collectionChainId]}tx/${transactionHash}`
                )
              }
            >
              Transaction <TbExternalLink display="block" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionStages;
