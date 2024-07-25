const { HNSWLib } = require("@langchain/community/vectorstores/hnswlib");
const { RetrievalQAChain, loadQARefineChain } = require("langchain/chains");
const { StringOutputParser } = require("@langchain/core/output_parsers");

const { GradientLLM } = require("@langchain/community/llms/gradient_ai");
const {GradientEmbeddings} = require("@langchain/community/embeddings/gradient_ai");
const { PromptTemplate } = require("@langchain/core/prompts");


async function getAnswer(req, res) {
  const model = new GradientLLM({
    gradientAccessKey: "zzLo89qNwkdGuk6w3ovNGB2Yj25HHR2b",
    workspaceId: "cef2978c-7e48-458a-976c-569bfdeaa13e_workspace",
    modelSlug: "llama2-7b-chat",
  });
  const { question } = req.body;

  const prompt = new PromptTemplate({
    template:
      "Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.\n\nContext: {context}\n\nQuestion: {question}\nHelpful Answer:",
    inputVariables: ["context", "question"],
  });

  try {
    const vectorStore = await HNSWLib.load(
      "hnswlib",
      new GradientEmbeddings({ 
        gradientAccessKey: "zzLo89qNwkdGuk6w3ovNGB2Yj25HHR2b",
        workspaceId: "cef2978c-7e48-458a-976c-569bfdeaa13e_workspace",
      }),
    );
    const vectorStoreRetriever = vectorStore.asRetriever({k: 1});

    const chain = new RetrievalQAChain({
      combineDocumentsChain: loadQARefineChain(model, {prompt}),
      retriever: vectorStoreRetriever,//vectorStore.asRetriever({k: 1}),
    });

    console.log(question);
    const result = await chain.invoke({
      query: question,
      //context: vectorStoreRetriever
    });
    console.log(result);
    return res.status(200).json({
      answer: result.output_text.replace(" Based on the context information provided , ","").replace(" Based on the context information provided,",""),
    });
  } catch (error) {
    console.log(error);
    return res.status(200).send({
      message: "Something went wrong",
      error,
    });
  }
}

module.exports = getAnswer;
