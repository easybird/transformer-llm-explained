export const explanations = {
  Kid: "Imagine words in a sentence are like friends in a classroom. Some friends pay more attention to each other, just like some words in a sentence are more connected. Our special 'attention' tool helps us see which words are best friends!",
  "Normal Adult": "In language, context is key. Transformers use a mechanism called 'attention' to understand how words in a sentence relate to each other. This helps the model grasp the meaning and nuances of language, much like how we humans understand context in conversations.",
  "Basic Programmer": "Transformers use self-attention to process sequences of data, like words in a sentence. Each word can 'attend' to every other word, creating a matrix of attention scores. These scores determine how much each word influences the understanding of other words in the context.",
  Intermediate: "In Transformer models, self-attention is computed using Query (Q), Key (K), and Value (V) matrices. The attention scores are calculated as softmax(QK^T / √d_k), where d_k is the dimension of the key vectors. These scores are then used to create a weighted sum of the values, allowing the model to focus on relevant parts of the input for each position.",
  Advanced: "Transformer models employ multi-head attention, allowing them to focus on different aspects of the input simultaneously. Each attention head computes Attention(Q, K, V) = softmax(QK^T / √d_k)V independently. The outputs from all heads are concatenated and linearly transformed to produce the final output. This mechanism enables the model to capture various types of dependencies and relationships within the data.",
}

export const textGenerationExplanations = {
  Kid: "Imagine a robot that loves to play with word blocks. It looks at the blocks it already has and tries to guess which block comes next. Sometimes it picks a funny block, and that's okay! It's all part of learning how to build sentences.",
  "Normal Adult": "Think of an LLM as a very smart guesser. It looks at the words it has so far and tries to predict the most likely next word. It's like finishing someone's sentence, but the LLM does this for every word in the text it generates.",
  "Basic Programmer": "LLMs process text as tokens, which can be words or parts of words. For each step, the model calculates probabilities for all possible next tokens based on the previous ones. It then selects a token, often choosing the most probable one but sometimes picking others to add variety.",
  Intermediate: "In text generation, LLMs use attention mechanisms to weigh the importance of previous tokens when predicting the next one. This process involves creating attention scores for each token pair, which are then used to compute a weighted sum of token representations, guiding the prediction of the next token.",
  Advanced: "LLMs generate text through a series of mathematical operations. Tokens are first converted to embeddings (high-dimensional vectors). Self-attention mechanisms then compute relationships between these embeddings. The resulting context-aware representations are passed through feed-forward layers and a softmax function, producing a probability distribution over the entire vocabulary for the next token prediction.",
}

