# AI-Powered Text Summariaztion and Search Using TF-IDF and Aho-Corasick Algorithm

This research aims to develop a web-based summarization platform designed to mitigate information overload. The system employs a dual-stage hybrid approach: an initial extractive layer filters the source material for key informational units, followed by an abstractive LLM layer that paraphrases the content. This methodology ensures that the output maintains high factual fidelity while achieving the readability of human-authored summaries.

---

## 🔍 Overview

This system first identifies important sentences and key phrases using classical algorithms, then refines the extracted content using **Gemini LLM** to produce coherent and context‑aware summaries.

---

## ✨ System Features

### 🧠 Hybrid Text Summarization

* **TF‑IDF (Term Frequency–Inverse Document Frequency)**
  Identifies statistically significant sentences based on word importance and frequency distribution.

* **Aho‑Corasick Algorithm**
  Efficiently detects and prioritizes key phrases generated from TF‑IDF keyword extraction.

* **Gemini LLM (Abstractive Layer)**
  Enhances fluency, coherence, and contextual understanding by transforming extracted content into natural, human‑readable summaries.

---

## 🏗️ System Architecture

1. User submits raw text via the web interface
2. TF‑IDF scores and selects important sentences
3. Aho‑Corasick detects relevant keywords and phrases
4. Filtered content is sent to Gemini LLM API
5. Final summarized output is returned to the user

---

## 🧰 Tech Stack

| Layer              | Technology                        |
| ------------------ | --------------------------------- |
| Frontend           | React, JSX, Tailwind CSS, CSS     |
| Backend            | Node.js, Express                  |
| NLP Algorithms     | TF‑IDF, Aho‑Corasick              |
| LLM API            | Gemini LLM                        |
| Summarization Type | Hybrid (Extractive + Abstractive) |
| Benchmark Testing  | Python                            |

---

## 🔗 Project Repositories

* **Frontend Repository**
  *(This repository)*

* **Backend Repository**
  👉 [https://github.com/dperrr/text-summarization-backend)



---

## 🚀 Other Features

* Support for PDF,txt and DOCX uploads
* TF-IDF SCORES AND SELECTED SENTENCES
* COMPARSION OF EXTRACTIVE AND ABSTRACTIVE SUMMARIZATION
* BLEU AND ROUGE SCORES

---

## 📌 License

This project is for academic and educational purposes.
