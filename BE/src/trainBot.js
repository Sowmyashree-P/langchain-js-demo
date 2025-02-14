
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { HNSWLib } = require("@langchain/community/vectorstores/hnswlib");
const fs = require("fs");
const {GradientEmbeddings} = require("@langchain/community/embeddings/gradient_ai");

async function trainBot(req, res) {
  try {
    const trainingText = fs.readFileSync("training-data.txt", "utf8");
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
    });
    const docs = await textSplitter.createDocuments([trainingText]);

    const vectorStore = await HNSWLib.fromDocuments(
      docs,
      new GradientEmbeddings({ 
        gradientAccessKey: "your-id",
        workspaceId: "your-workspace-id",
      }),
    );
    vectorStore.save("hnswlib");
    console.log("success");

    return res.status(200).json({
      message: vectorStore,
    });
  } catch (error) {
    // Handle any errors that may occur
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = trainBot;
