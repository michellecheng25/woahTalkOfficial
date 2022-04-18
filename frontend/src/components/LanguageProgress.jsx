import "./languageProgress.css";

function LanguageProgress({ native, foreign, nativeLevel, foreignLevel }) {
  const assignLevel = (language) => {
    switch (language) {
      case "Advanced":
        return "100%";
      case "Intermediate":
        return "66%";
      default:
        return "33%";
    }
  };

  const nativeProgress = assignLevel(nativeLevel) || "0%";
  const foreignProgress = assignLevel(foreignLevel) || "0%";

  return (
    <div className="profile_language_info">
      <div className="language">
        {native}
        {native && (
          <div className="level">
            <div className="level-fill" style={{ width: nativeProgress }}></div>
          </div>
        )}
      </div>
      <div className="language">
        {foreign}
        {foreign && (
          <div className="level">
            <div
              className="level-fill"
              style={{ width: foreignProgress }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LanguageProgress;
