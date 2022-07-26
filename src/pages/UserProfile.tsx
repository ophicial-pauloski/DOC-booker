import { Box, Container, Flex, Avatar, Text, Button } from '@chakra-ui/react'
import { useAppSelector } from '../app/hooks'
import { Center } from '@chakra-ui/react';

export const UserProfile = () => {
    const { user } = useAppSelector(state => state.auth)
    
  return (
    <Container mt={3} maxW='container.xl'>
      <Box display={"flex"} justifyContent='center'>
        <Flex>
          <Avatar
            name={`${user?.first_name} ${user?.last_name}`}
            size={"lg"}
            //   src='https://bit.ly/sage-adebayo'
          />
          <Box ml='3' mt={2}>
            <Text fontWeight='bold'>
              {user?.first_name} {user?.last_name}
            </Text>
            <Text fontSize='sm'>Software Developer</Text>
          </Box>
        </Flex>
      </Box>
      <Center>
        <Button mt={3}> Edit Profile </Button>
      </Center>
    </Container>
  );
}
