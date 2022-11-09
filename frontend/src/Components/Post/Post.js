import { useEffect, useState } from 'react';
import { useWallet } from '../../Context/WalletContext';
import { uploadData } from '../../Helpers/ipfs';
import { useKNOV1Contract } from '../../Context/ContractContext';
import { getSigner } from '../../Helpers/provider';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

function Post() {
  const { walletAddress } = useWallet();
  const { knov1Contract } = useKNOV1Contract();

  const [author, setAuthor] = useState(walletAddress);
  const [title, setTitle] = useState('');
  const [reward, setReward] = useState('');
  const [content, setContent] = useState('');
  const [timestamp, setTimestamp] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    setAuthor(walletAddress);
  }, [walletAddress]);

  const onTitleHandler = (e) => {
    setTitle(e.target.value);
    setTimestamp(Date.now());
  };
  const onRewardHandler = (e) => {
    setReward(e.target.value);
    console.log(reward);
    setTimestamp(Date.now());
  };

  const onContentHandler = (e) => {
    setContent(e.target.value);
    setTimestamp(Date.now());
  };

  const onPost = async (e) => {
    const signedKnoV1Contract = knov1Contract.connect(await getSigner());
    const qid = (await signedKnoV1Contract.getTotalQuestionNumber()).toNumber();
    const nickname = await signedKnoV1Contract.getUserNickname(walletAddress);

    const postInfo = {
      type: 'Question',
      qid,
      author,
      nickname,
      timestamp,
      title,
      content,
    };

    if (!title || !content) {
      console.log('Fill in all forms');
    } else {
      alert('Wait for upload...');
      // upload the post
      const cid = await uploadData(postInfo);
      // const cid = ethers.utils.formatBytes32String(await uploadData(postInfo));
      alert('Uploaded to IPFS, wait for Ethereum transaction...');

      const tx = await signedKnoV1Contract.postQuestion(
        cid,
        ethers.utils.parseEther(`${reward}`)
      );
      await tx.wait();

      const userQids = await signedKnoV1Contract.getUserQids();

      for (let qid of userQids) {
        const question = await signedKnoV1Contract.getQuestion(qid._hex);
        console.log(question);
      }

      alert('Question Posted');
      navigate('/');
    }
  };

  return (
    <div className="Post">
      <div className="post pt-4">
        <form>
          <div className="form-group row">
            <label htmlFor="title" className="col-sm-2 col-form-label">
              Title
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control form-body"
                id="title"
                name="title"
                value={title}
                onChange={onTitleHandler}
              ></input>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="reward" className="col-sm-2 col-form-label">
              Reward Token
            </label>
            <div className="col-sm-2">
              <input
                type="text"
                placeholder="ex: 20"
                className="form-control form-body"
                id="reward"
                name="reward"
                value={reward}
                onChange={onRewardHandler}
              ></input>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="content" className="col-sm-2 col-form-label">
              Content
            </label>
            <div className="col-sm-10">
              <textarea
                type="text"
                className="form-control form-body form-content"
                id="content"
                name="content"
                value={content}
                onChange={onContentHandler}
              ></textarea>
            </div>
          </div>
        </form>

        <button
          onClick={onPost}
          className="btn btn-post bg-dark btn-outline-light btn-lg px-5 text-white "
        >
          Post Question
        </button>
      </div>
    </div>
  );
}

export default Post;
