import React from "react";

function ResponseAsTable({ response }) {
  return (
    <>
      <h3 className="text-[12px] font-medium text-white mt-2">
        Response as Table
      </h3>

      <div className="flex flex-col mt-2 bg-white/10 p-[1px] gap-[1px]">
        {Object.entries(response).map((entry, index) => (
          <div className="flex w-full relative gap-[1px] group" key={index}>
            {/* <div className="w-[44px] flex items-center justify-center bg-neutral-800 flex-shrink-0" /> */}

            <div className="flex items-center justify-start w-full relative gap-[1px]">
              {entry.map((value, idx) => {
                return (
                  <input
                    readOnly
                    className="text-[12px] text-white w-[50%] p-2 outline-none bg-neutral-800"
                    value={value}
                    onChange={(e) => {
                      return;
                    }}
                    key={idx}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ResponseAsTable;
