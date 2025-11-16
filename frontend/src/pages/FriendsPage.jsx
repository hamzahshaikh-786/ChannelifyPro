import { useEffect, useState } from "react";
import { getUserFriends } from "../lib/api";

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const data = await getUserFriends();
        setFriends(data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  if (loading) {
    return <div>Loading friends...</div>;
  }

  if (!friends || friends.length === 0) {
    return <div>No friends found.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Friends</h1>
      <ul className="space-y-2">
        {friends.map((friend) => (
          <li key={friend._id}>
            <span className="text-lg text-blue-500">{friend.fullName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsPage;
