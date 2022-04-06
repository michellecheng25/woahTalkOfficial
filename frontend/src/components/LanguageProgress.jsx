import "./languageProgress.css";

function LanguageProgress() {
  const nativeLevel = "100%";
  const foreignLevel = "33%";

  return (
    <div className="profile_language_info">
      <div className="language">
        Native
        <div className="level">
          <div className="level-fill" style={{ width: nativeLevel }}></div>
        </div>
      </div>
      <div className="language">
        Foreign
        <div className="level">
          <div className="level-fill" style={{ width: foreignLevel }}></div>
        </div>
      </div>
    </div>
  );
}

export default LanguageProgress;
