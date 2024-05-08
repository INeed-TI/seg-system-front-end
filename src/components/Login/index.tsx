import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
	ModalCloseButton,
	Icon,
	InputRightElement,
	InputGroup,
	Box,
} from '@chakra-ui/react';
import axios from 'axios';
import { FaRegCheckCircle } from 'react-icons/fa';
import { BsKey, BsPerson } from "react-icons/bs";

export default function LoginScreen() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false); // Estado para controlar a exibição do modal
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

	useEffect(() => {
    const params = new URLSearchParams(location.search);
  
		const endRequest = params.get('endRequest');
  
		if (endRequest === 'true') {
      setShowModal(true);
    }

  }, [location.search, navigate]);


  async function loginUserFunction() {
    try {
      const response = await axios.post('http://localhost:3333/sessions', {
        email: userEmail,
        password: userPassword,
      });

      if (response.data.token) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7); // Expira em 7 dias

        document.cookie = `refreshToken=${response.data.token};expires=${expirationDate.toUTCString()};path=/`;
      }
      navigate('/dashboard');

    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  const handleLogin = async (event:any) => {
    event.preventDefault();
    try {
      // Exibir o toast de carregamento enquanto a promessa está pendente
      await toast.promise(loginUserFunction(), {
        loading: { title: 'Entrando...', description: 'Por favor, aguarde...' },
        success: { title: 'Usuário logado com sucesso!', description: 'Looks great' },
        error: { title: 'Erro ao logar usuário', description: 'Something wrong' },
      });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      backgroundImage="./img/mapleBearBackground.jpg"
      bgSize="cover"
      bgPosition="center"
      position="relative" // Para posicionar elementos filhos relativos a este
    >
      {/* Overlay escuro */}
      <Flex
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="rgba(0, 0, 0, 0.5)" // Define um overlay escuro
        zIndex="1" // Ajusta a camada de empilhamento
      ></Flex>

      <Stack
        className="meuBackground com opacity"
        spacing={4}
        w={'full'}
        maxW={'md'}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
        as="form"
        onSubmit={handleLogin}
        bg="rgba(255, 255, 255, 0.8)"
        zIndex="2" // Ajusta a camada de empilhamento para que o formulário esteja sobre o overlay escuro
        position="relative" // Define a posição relativa para que o zIndex funcione corretamente
        border="#fff solid 0.12rem"
      >
				<Box>
					<Image src="images" />
				</Box>
				<InputGroup >
					<FormControl id="email" border="solid black 0.06rem" borderRadius="1rem">
						<Input
						  borderRadius="1rem"
							type="email"
							bg={'gray.100'}
							placeholder="Digite seu Email"
							border={0}
							color={'gray.900'}
							_placeholder={{
								color: 'gray.500',
							}}
							value={userEmail}
							onChange={(e) => setUserEmail(e.target.value)}
						/>
						<InputRightElement width='4.5rem'>
							<BsPerson />
						</InputRightElement>
					</FormControl>
				</InputGroup>

				<InputGroup>
					<FormControl id="password" border="solid black 0.06rem" borderRadius="1rem">
							<Input
								type="password"
								borderRadius="1rem"
								bg={'gray.100'}
								placeholder="Digite sua Senha"
								border={0}
								color={'gray.900'}
								_placeholder={{
									color: 'gray.500',
								}}
								value={userPassword}
								onChange={(e) => setUserPassword(e.target.value)}
							/>
							<InputRightElement width='4.5rem'>
								<BsKey />
							</InputRightElement>
					</FormControl>
				</InputGroup>
        <Stack spacing={6}>
          <Button
            type="submit"
            color={'white'}
            bgColor={'red.500'}
            _hover={{
              bgColor: 'red',
              opacity: 0.5,
            }}
            _active={{
              bgColor: 'red.300',
            }}
            variant={'solid'}
          >
            Continuar
          </Button>
          {errorMessage !== '' && (
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}
            >
              <Text color="gray.800">{`${errorMessage}`}</Text>
            </Stack>
          )}
        </Stack>
      </Stack>

      {/* Modal */}
      
			<Modal isOpen={showModal} onClose={() => setShowModal(false)} isCentered>
				<ModalOverlay />
				<ModalContent
					bg="white"
					color="gray.800"
					borderRadius="xl"
					p={4}
					textAlign="center"
					boxShadow="md"
				>
					<ModalCloseButton color="gray.400" />
					<ModalHeader mt={4} fontSize="xl" fontWeight="bold">
						Obrigado pelo seu pedido!
					</ModalHeader>
					<ModalBody fontSize="md">
						<Flex flexDir={'column'}>
							<Icon as={FaRegCheckCircle} alignSelf={"center"} color="green.500" mt={1} fontSize="3xl" />
							Leve o ticket impresso ao refeitório
						</Flex>
					</ModalBody>
					<ModalFooter justifyContent="center" mt={4}>
						<Button colorScheme="red" onClick={() => setShowModal(false)}>
							Fechar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
    </Flex>
  );
}
