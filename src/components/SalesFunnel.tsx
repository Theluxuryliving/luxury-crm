export default function SalesFunnel({ currentStage }: { currentStage: string }) {
  const stages = ["New", "Contacted", "Interested", "Negotiation", "Closed"];

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded shadow">
      {stages.map((stage, index) => {
        const isActive = stage === currentStage;
        const isCompleted = stages.indexOf(currentStage) > index;

        return (
          <div key={stage} className="flex items-center w-full">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full text-white text-sm font-bold
                ${isCompleted ? "bg-green-500" : isActive ? "bg-blue-600" : "bg-gray-300"}`}
            >
              {index + 1}
            </div>
            <div className="ml-2 mr-4 text-xs font-medium text-gray-700 w-24 truncate">
              {stage}
            </div>
            {index < stages.length - 1 && (
              <div className="flex-1 h-1 bg-gray-300 mx-2 relative">
                <div
                  className={`h-1 ${isCompleted ? "bg-green-500" : isActive ? "bg-blue-500" : ""} w-full`}
                ></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
