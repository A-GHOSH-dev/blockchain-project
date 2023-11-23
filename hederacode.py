import json
import time
from hedera import Client

# Create a Hedera Hashgraph client
client = Client()

# Get the current consensus state
consensus_state = client.get_consensus_state()

# Print the consensus state
print(json.dumps(consensus_state, indent=4))

