import json
from web3 import Web3

# Create a Web3 client
web3 = Web3()

# Get the current block header
block_header = web3.eth.get_block_header("latest")

# Print the block header
print(json.dumps(block_header, indent=4))
