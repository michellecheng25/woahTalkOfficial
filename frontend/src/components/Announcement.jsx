import "./announcement.css";
import { dateConversionNums } from "../utils/dateConversion";
import { MdDelete } from "react-icons/md";

function Announcement({ announcement, user, course, onDelete }) {
  const announcementDate = dateConversionNums(announcement.updatedAt);

  return (
    <div className="announcement">
      <div className="heading">
        <span className="title">{announcement.title}</span>
        <span className="date">{announcementDate}</span>
        {user && user._id === course.creatorId && (
          <MdDelete
            size={20}
            style={{ color: "#336D49", marginLeft: "10px", cursor: "pointer" }}
            onClick={() => {
              onDelete(announcement._id);
            }}
          />
        )}
      </div>
      {announcement.description && (
        <div className="description">{announcement.description}</div>
      )}
    </div>
  );
}

export default Announcement;
