import { Button } from "../ui/button";

const EarnPointsView = ({ userData, onBack }) => {
  return (
    <>
      <h3 className="text-lg font-semibold px-4 pt-2 text-black">
        Earn points
      </h3>
      <div className="p-4">
        <div className="space-y-4">
          {userData?.events
            .filter((Event) => Event.type === "CREDIT")
            .map((Event) => {
              const { event, points } = Event;
              return (
                <div key={event} className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-medium text-black lowercase">
                      {event.replace(/_/g, " ")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Earn {points} points
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="px-4 py-2 text-black"
                    onClick={() => {
                      window.location.href =
                        "https://www.dotandkey.com/products";
                    }}
                  >
                    Earn Points
                  </Button>
                </div>
              );
            })}
        </div>
        {userData?.events?.length === 0 && (
          <p className="text-sm text-muted-foreground">
            You currently have no tiers
          </p>
        )}
      </div>
      <div className="rounded-b-lg bg-gray-100 p-4 text-center">
        <Button
          variant="outline"
          className="w-full text-black"
          onClick={onBack}
        >
          Go Back
        </Button>
      </div>
    </>
  );
};

export default EarnPointsView;
