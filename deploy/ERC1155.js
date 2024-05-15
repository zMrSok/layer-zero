const LZ_ENDPOINTS = require("../constants/layerzeroEndpoints.json");

module.exports = async function ({ deployments, getNamedAccounts, hre }) {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    // Log the deployer's address
    console.log(`>>> Deployer address: ${deployer}`);

    // Get the LayerZero endpoint address for the current network
    const lzEndpointAddress = LZ_ENDPOINTS[hre.network.name];
    if (!lzEndpointAddress) {
        console.error(`Error: No LayerZero endpoint configured for network ${hre.network.name}`);
        return;
    }
    console.log(`[${hre.network.name}] Endpoint Address: ${lzEndpointAddress}`);

    try {
        // Deploy the ERC1155Mock contract
        const deploymentResult = await deploy("ERC1155Mock", {
            from: deployer,
            args: ["test,com"],
            log: true,
            waitConfirmations: 1,
        });
        
        // Log the deployment result
        console.log(`ERC1155Mock deployed at address: ${deploymentResult.address}`);
    } catch (error) {
        // Handle deployment errors
        console.error(`Failed to deploy ERC1155Mock: ${error.message}`);
    }
};

// Tag the deployment script
module.exports.tags = ["ERC1155Mock"];
