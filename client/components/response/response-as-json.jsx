import React from "react";

function ResponseAsJson({ response }) {
  return (
    <>
      <h3 className="text-[12px] font-medium text-white mt-2">
        Response as JSON
      </h3>

      <div className="text-white w-full min-h-[100px] bg-neutral-800 whitespace-pre border border-white/10 rounded mt-3 px-2 py-1 text-[12px]">
        {JSON.stringify(response, null, 2)}
      </div>
    </>
  );
}

export default ResponseAsJson;
