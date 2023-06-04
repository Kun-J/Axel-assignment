import Web3 from 'web3';

const web3 = new Web3('mainnet url');

async function getCreationCode(contractAddress) {
    try {
        const latestBlockNum = await web3.eth.blockNumber();
        for(let blockNum = latestBlockNum; blockNum >= 0; blockNum--) {
            const block = await web3.eth.getBlock(blockNum, true);
            for(let i = 0; i < block.transactions.length; i++) {
                const tx = block.transactions[i];
                if (tx.to === null) {
                    const receipt = await web3.eth.getTransactionReceipt(tx.hash);
                    if (receipt.contractAddress === contractAddress) {
                        return receipt.input;
                    }
                }
                break;
            }
            break;
        }

    } catch(error) {
        console.error('Cannot find creation code', error);
        throw error;
    }
}

const contractAddress = 'address';
getCreationCode(contractAddress)
.then((input) => {
    console.log('Creation ByteCode:', input);
})
  .catch((error) => {
    console.error('Error:', error);
  });
