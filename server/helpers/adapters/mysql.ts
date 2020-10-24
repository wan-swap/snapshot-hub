import db from '../mysql';

export async function storeProposal(space, token, body, authorIpfsHash, relayerIpfsHash) {
  const msg = JSON.parse(body.msg);
  let query = 'INSERT IGNORE INTO messages SET ?;';
  await db.queryAsync(query, [{
    id: authorIpfsHash,
    address: body.address,
    version: msg.version,
    timestamp: msg.timestamp,
    space,
    token,
    type: 'proposal',
    payload: JSON.stringify(msg.payload),
    sig: body.sig,
    metadata: JSON.stringify({
      relayer_ipfs_hash: relayerIpfsHash
    })
  }]);
}

export async function storeVote(space, token, body, authorIpfsHash, relayerIpfsHash) {
  const msg = JSON.parse(body.msg);
  let query = 'INSERT IGNORE INTO messages SET ?;';
  await db.queryAsync(query, [{
    id: authorIpfsHash,
    address: body.address,
    version: msg.version,
    timestamp: msg.timestamp,
    space,
    token,
    type: 'vote',
    payload: JSON.stringify(msg.payload),
    sig: body.sig,
    metadata: JSON.stringify({
      relayer_ipfs_hash: relayerIpfsHash
    })
  }]);
}
