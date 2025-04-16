import pkg from "transbank-sdk";

const { WebpayPlus } = pkg;

WebpayPlus.configureForTesting();

export default WebpayPlus;
