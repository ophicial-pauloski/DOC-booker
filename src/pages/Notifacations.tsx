import { Box, Heading, Text } from "@chakra-ui/react";
import { useAppSelector } from "../app/hooks";
import { IoMdCloseCircle } from "react-icons/io";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { appRespondClient } from '../api/index';

export const Notifacations = () => {
  const { user } = useAppSelector(state => state.auth);

  const deleteUserNotification = async (id: string): Promise<void> => {
    try {
      const { data } = await appRespondClient.delete(
        `/api/auth/delete-unseen-notification/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (data.success) {
        toast.success("Notification deleted successfully");
        window.location.reload();
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Box mt={3}>
      <Heading as='h1' size='lg'>
        Notifications
      </Heading>
      <hr />
      <Box>
        {/* user notification not less than one and map */}
        {user?.unseenNotification.length > 0 ? (
          <Box>
            {user?.unseenNotification.map(
              (notification: any, index: number) => (
                <Box
                  bg={"white"}
                  border='1px'
                  borderColor={"#eaeaea"}
                  p={3}
                  rounded={"md"}
                  w={"100%"}
                  display={"flex"}
                  alignItems='center'
                  justifyContent='space-between'
                  mt={2}
                  key={index}
                >
                  <Link to={`/admin/doctors`}>
                    <Text cursor='pointer'>{notification.message}</Text>
                  </Link>
                  <Box
                    cursor='pointer'
                    onClick={() => deleteUserNotification(notification.id)}
                  >
                    <IoMdCloseCircle size={"20px"} color='red' />
                  </Box>
                </Box>
              )
            )}
          </Box>
        ) : (
          <Box>No notification</Box>
        )}
      </Box>
    </Box>
  );
};
