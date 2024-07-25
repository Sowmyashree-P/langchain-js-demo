
const { HNSWLib } = require("@langchain/community/vectorstores/hnswlib");
const { StringOutputParser } = require("@langchain/core/output_parsers");
const { RetrievalQAChain, loadQARefineChain } = require("langchain/chains");
const { GradientLLM } = require("@langchain/community/llms/gradient_ai");
const {GradientEmbeddings} = require("@langchain/community/embeddings/gradient_ai");


async function getAnswer(req, res) {

  const model = new GradientLLM({
    gradientAccessKey: "zzLo89qNwkdGuk6w3ovNGB2Yj25HHR2b",
    workspaceId: "cef2978c-7e48-458a-976c-569bfdeaa13e_workspace",
    modelSlug: "llama2-7b-chat",
  });
  const { question } = req.body;

  try {
    const vectorStore = await HNSWLib.load(
      "hnswlib",
      new GradientEmbeddings({ 
        gradientAccessKey: "zzLo89qNwkdGuk6w3ovNGB2Yj25HHR2b",
        workspaceId: "cef2978c-7e48-458a-976c-569bfdeaa13e_workspace",
      }),
    );

    const chain = new RetrievalQAChain({
      combineDocumentsChain: loadQARefineChain(model),
      retriever: vectorStore.asRetriever({k: 1}),
      StringOutputParser
    });
    const result = await chain.invoke({
      query: question,
    });
    console.log(result);
    return res.status(200).json({
      answer: result.output_text,
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



// const { HNSWLib } = require("@langchain/community/vectorstores/hnswlib");
// const { RetrievalQAChain, loadQARefineChain } = require("langchain/chains");
// const { StringOutputParser } = require("@langchain/core/output_parsers");

// const { GradientLLM } = require("@langchain/community/llms/gradient_ai");
// const {GradientEmbeddings} = require("@langchain/community/embeddings/gradient_ai");
// const { PromptTemplate } = require("@langchain/core/prompts");
// // const { RunnableSequence, RunnablePassthrough } = require("langchain/runnables");


// async function getAnswer(req, res) {
//   const model = new GradientLLM({
//     gradientAccessKey: "zzLo89qNwkdGuk6w3ovNGB2Yj25HHR2b",
//     workspaceId: "cef2978c-7e48-458a-976c-569bfdeaa13e_workspace",
//     modelSlug: "llama2-7b-chat",
//   });
//   const { question } = req.body;

//   // const combineDocuments = (docs) => {
//   //   return docs.map(doc => doc.pageContent).join("\n");
//   // }

//   // const standAloneQuestionTemplate = 'Given a question, convert it to a stand-alone question.question: {question} standalone question:';
//   // const standAloneQuestionPrompt = PromptTemplate.fromTemplate(standAloneQuestionTemplate);
  
//   // const answerTemplate = `You are a helpful and enthusiastic support bot who can answer a given question based on the context provided.
//   // Try to find the answer in the context. If you really dont know the answer, say "I'm sorry, I don't know the answer to that question".
//   // Dont try to make up an answer. Always speak as if you were chatting to a friend.
//   // context: {context}
//   // question: {question}
//   // answer:
//   // `;
//   // const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);
//   // const vectorStore = await HNSWLib.load(
//   //   "hnswlib",
//   //   new GradientEmbeddings({ 
//   //     gradientAccessKey: "zzLo89qNwkdGuk6w3ovNGB2Yj25HHR2b",
//   //     workspaceId: "cef2978c-7e48-458a-976c-569bfdeaa13e_workspace",
//   //   }),
//   // );
//   // const retriever = vectorStore.asRetriever({k: 1});
//   // const standAloneQuestionChain = standAloneQuestionPrompt.pipe(model).pipe(new StringOutputParser());
//   // //.pipe(retriever).pipe(answerPrompt);
//   // const retrieverChain = RunnableSequence.from([
//   //     prevResult => prevResult.standalone_question,
//   //     retriever,
//   //     combineDocuments
//   // ]);
//   // const answerChain = answerPrompt.pipe(model).pipe(new StringOutputParser());
//   // const chain = RunnableSequence.from([
//   //   {
//   //     standalone_question: standAloneQuestionChain,
//   //     original_input: new RunnablePassthrough(),
//   //   },
//   //   {
//   //     context: retrieverChain,
//   //     question: ({original_input}) => original_input.question,
//   //   },
//   //   answerChain
//   // ])
//   // const finalAnswer = await chain.invoke({ question });
//   // console.log(standAloneQuestionChain,finalAnswer);

//   const prompt = new PromptTemplate({
//     template:
//       "Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.\n\nContext: {context}\n\nQuestion: {question}\nHelpful Answer:",
//     inputVariables: ["context", "question"],
//   });

//   try {
//     const vectorStore = await HNSWLib.load(
//       "hnswlib",
//       new GradientEmbeddings({ 
//         gradientAccessKey: "zzLo89qNwkdGuk6w3ovNGB2Yj25HHR2b",
//         workspaceId: "cef2978c-7e48-458a-976c-569bfdeaa13e_workspace",
//       }),
//     );
//     const vectorStoreRetriever = vectorStore.asRetriever({k: 1});

//     // console.log(
//     //   "vectorStoreRetriever",
//     //   await vectorStoreRetriever._getRelevantDocuments()
//     // );

//     const chain = new RetrievalQAChain({
//       combineDocumentsChain: loadQARefineChain(model, {prompt}),
//       retriever: vectorStoreRetriever,//vectorStore.asRetriever({k: 1}),
//     });

//     console.log(question);
//     const result = await chain.invoke({
//       query: question,
//       //context: vectorStoreRetriever
//     });
//     console.log(result);
//     return res.status(200).json({
//       answer: result.output_text.replace(" Based on the context information provided , ","").replace(" Based on the context information provided,",""),
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(200).send({
//       message: "Something went wrong",
//       error,
//     });
//   }
// }

// module.exports = getAnswer;
