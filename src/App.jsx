import { useEffect, useState } from 'react'
import { GoogleGenAI } from "@google/genai";

function App() {
  const [api, setApi] = useState('');
  const [question, setQuestion] = useState('');
  const [ans, setAns] = useState({});
  const [loading, setLoading] = useState(false);

  const ai = new GoogleGenAI({ apiKey: api });

  // 🔹 Load saved API key + answer when popup opens
  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.get(["api", "ans"], (result) => {
        if (result.api) setApi(result.api);
        if (result.ans) setAns(result.ans);
      });
    }
  }, []);

  // 🔹 Save API to storage
  const setApiLocal = (api) => {
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.set({ api }, () => {
        alert("API key saved!");
      });
    } else {
      alert("Chrome storage not available (probably running in dev).");
    }
  };

  // 🔹 Generate answer and persist it
  const generateans = async () => {
    if (!api) {
      alert("Enter Api Key");
      setQuestion('');
      return;
    }

    setLoading(true);

    const inp =
      "/human - Document and write logic steps for this code on points like eye chatching short title, Intuition, Approach, Time and Space complexity(Don't explain Time ans Space complexity, just write the number). Remember the Intuition should be short and to the point. Give the answer into JSON format on these points only. Code: " +
      question +
      " If the question is not related to Code or leetcode, don't write anything just give a generic answer like 'This question is not related to Code or leetcode or DSA'.";

    try {
      const res = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: inp,
        config: { thinkingConfig: { thinkingBudget: 0 } }
      });

      setLoading(false);
      setQuestion('');

      const MockJsonResp = res.text.replace('```json', '').replace('```', '');
      const parsedAns = JSON.parse(MockJsonResp);

      setAns(parsedAns);

      // 🔹 Save result into chrome storage
      // chrome.storage.local.set({ ans: parsedAns });
      if (typeof chrome !== "undefined" && chrome.storage) {
        chrome.storage.local.set({ ans: parsedAns  });
      } else {
        alert("Chrome storage not available (probably running in dev).");
      }
    } catch (err) {
      setLoading(false);
      console.error("Error generating answer:", err);
    }
  };

  const resetData = () => {
    // setApi('');
    // setQuestion('');
    // setAns({});

    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.remove('ans', () => {
        setQuestion('');
        setAns({});
        alert("Answer data cleared! API key is safe.");
      })
    } else {
      alert("Chrome storage not available (probably running in dev).");
    }
  }

  return (
    <div className="w-full h-full bg-zinc-900 text-white">
      <div className="flex flex-col justify-center items-center p-5 ">
        <h1 className="text-5xl bebas-neue-regular text-center text-orange-400 ">
          Leetcode AI Documentation
        </h1>

        <div className="flex w-[80%] mt-5 mb-5 gap-4 ">
          <input
            type="password"
            placeholder="Enter Api Key"
            value={api}
            onChange={(e) => setApi(e.target.value)}
            className="p-2 delius-regular border-2 border-zinc-600 rounded-lg w-[75%] outline-1 outline-orange-400 bg-zinc-800"
          />
          <button
            className="px-2 w-[25%] text-xl smooch-sans-regular border-2 border-zinc-600 rounded-lg outline-1 cursor-pointer bg-blue-500 hover:bg-blue-400"
            onClick={() => setApiLocal(api)}
          >
            Save
          </button>
        </div>

        <textarea
          className="p-2 delius-regular border-2 border-zinc-600 m-5 rounded-lg w-[80%] h-64 outline-1 outline-orange-400 bg-zinc-800"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Write your Code here"
        />

        <div className='flex gap-4 w-[80%] mt-4 mb-5'>
          <button
            type="submit"
            onClick={generateans}
            className="p-2 border-2 smooch-sans-regular text-2xl border-zinc-600  rounded-lg w-[50%] outline-1 cursor-pointer bg-blue-500"
          >
            Generate Answer
          </button>

          <button
            type="submit"
            onClick={resetData}
            className="p-2 border-2 smooch-sans-regular text-2xl border-zinc-600  rounded-lg w-[50%] outline-1 cursor-pointer bg-blue-500">
            Clear Data
          </button>

        </div>


      </div>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin w-15 h-15">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path
                fill="#fd8a08"
                d="M272 112C272 85.5 293.5 64 320 64C346.5 64 368 85.5 368 112C368 138.5 346.5 160 320 160C293.5 160 272 138.5 272 112zM272 528C272 501.5 293.5 480 320 480C346.5 480 368 501.5 368 528C368 554.5 346.5 576 320 576C293.5 576 272 554.5 272 528zM112 272C138.5 272 160 293.5 160 320C160 346.5 138.5 368 112 368C85.5 368 64 346.5 64 320C64 293.5 85.5 272 112 272zM480 320C480 293.5 501.5 272 528 272C554.5 272 576 293.5 576 320C576 346.5 554.5 368 528 368C501.5 368 480 346.5 480 320zM139 433.1C157.8 414.3 188.1 414.3 206.9 433.1C225.7 451.9 225.7 482.2 206.9 501C188.1 519.8 157.8 519.8 139 501C120.2 482.2 120.2 451.9 139 433.1zM139 139C157.8 120.2 188.1 120.2 206.9 139C225.7 157.8 225.7 188.1 206.9 206.9C188.1 225.7 157.8 225.7 139 206.9C120.2 188.1 120.2 157.8 139 139zM501 433.1C519.8 451.9 519.8 482.2 501 501C482.2 519.8 451.9 519.8 433.1 501C414.3 482.2 414.3 451.9 433.1 433.1C451.9 414.3 482.2 414.3 501 433.1z"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Answer */}
      {Object.keys(ans).length > 0 && !loading && (
        <div className="text-gray-300 text-sm p-5 border border-zinc-600">
          <div className="mb-4">
            <h2 className="text-2xl inline text-orange-400">Title : </h2>
            <span className="text-xl delius-regular">{ans.title}</span>
          </div>

          <div className="mb-4">
            <h2 className="text-2xl inline   text-orange-400">Intuition : </h2>
            <span className=" delius-regular">{ans.intuition}</span>
          </div>

          <div className="mb-4">
            <h2 className="text-2xl inline text-orange-400">Approach : </h2>
            {Array.isArray(ans.approach) ? (
              ans.approach.map((item, index) => (
                <p key={index} className="delius-regular">
                  <span>{index + 1}.</span> {item}
                </p>
              ))
            ) : (
              <p className="delius-regular">{typeof ans === "string" ? ans : ans.approach}</p>
            )}
          </div>

          <div className="mb-4">
            <h2 className="text-2xl inline text-orange-400">Time Complexity : </h2>
            <span className="text-xl uppercase delius-regular">{ans.time_complexity}</span>
          </div>

          <div>
            <h2 className="text-2xl inline text-orange-400">Space Complexity : </h2>
            <span className="text-xl uppercase delius-regular">{ans.space_complexity}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
