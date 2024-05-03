const LZ_ENDPOINTS = require("../constants/layerzeroEndpoints.json");
const { deployments, ethers } = require("hardhat");

// Main deployment function wrapped in an async function
module.exports = async function () {
    // Get deployment functions and named accounts
    const { deploy } = deployments;
    const { deployer } = await ethers.getNamedAccounts();

    // Log the deployer address
    console.log(`>>> Deployer address: ${deployer}`);

    // Get the LayerZero endpoint address for the current network
    const lzEndpointAddress = LZ_ENDPOINTS[ethers.network.name];
    console.log(`[${ethers.network.name}] LayerZero Endpoint Address: ${lzEndpointAddress}`);

    try {
        // Deploy the ONFT1155 contract
        const deploymentResult = await deploy("ONFT1155", {
            from: deployer,
            args: [process.env.IPFS_BASE_URL || "ipfs:/", lzEndpointAddress],
            log: true,
            waitConfirmations: process.env.CONFIRMATIONS || 1,
        });

        // Log the address of the deployed contract
        console.log(`Contract deployed at: ${deploymentResult.address}`);
    } catch (error) {
        // Log any errors that occur during the deployment
        console.error("Failed to deploy contract:", error);
    }
};

// Specify the tags for the deployment script, useful for filtering deployments
module.exports.tags = ["ONFT1155"];
