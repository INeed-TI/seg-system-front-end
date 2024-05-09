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
	Image,
	Link,
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
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      navigate('/dashboard');
			
      resolve({ data: { token: 'your_token_here' } });
    }, 3000); // Simula um atraso de 3 segundos antes de retornar sucesso
  });
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
			bgColor="#F6F6F6"
      bgSize="cover"
      bgPosition="center"
      position="relative" // Para posicionar elementos filhos relativos a este
    >

		
      <Stack
        className="meuBackground com opacity"
        spacing={4}
        w={'full'}
        maxW={'md'}
        rounded={'xl'}
        p={6}
        my={12}
        as="form"
        onSubmit={handleLogin}
        bg="#F6F6F6"
        zIndex="2" // Ajusta a camada de empilhamento para que o formulário esteja sobre o overlay escuro
        position="relative" // Define a posição relativa para que o zIndex funcione corretamente
      >
				<Box display="flex" justifyContent="space-around">
					<Image src="/Logos/loginLogo.png" w="50%"/>
					<Heading alignSelf="center" fontFamily="sans-serif" w="50%" fontWeight="400" fontSize="2.1rem">EARLY ACCESS EXCLUSIVO</Heading>
				</Box>
				<InputGroup >
					<FormControl id="email" border="solid black 0.06rem" borderRadius="1rem">
						<Input
						  borderRadius="1rem"
							type="email"
							bg={'#ffffff'}
							placeholder="Digite seu Email"
							border={0}
							color={'gray.900'}
							_placeholder={{
								color: 'gray.500',
							}}
							value={userEmail}
							onChange={(e) => setUserEmail(e.target.value)}
						/>
						<InputRightElement width='4.5rem' as={"label"} htmlFor="email">
							<BsPerson />
						</InputRightElement>
					</FormControl>
				</InputGroup>

				<InputGroup>
					<FormControl id="password" border="solid black 0.06rem" borderRadius="1rem">
							<Input 
								type="password"
								borderRadius="1rem"
								bg={'#ffffff'}
								placeholder="Digite sua Senha"
								border={0}
								color={'gray.900'}
								_placeholder={{
									color: 'gray.500',
								}}
								value={userPassword}
								onChange={(e) => setUserPassword(e.target.value)}
							/>
							<InputRightElement width='4.5rem' as={"label"} htmlFor="password">
								<BsKey />
							</InputRightElement>
					</FormControl>
				</InputGroup>
				<Link href="#" alignSelf={"center"} color={"#5f748b"} textDecor={"underline"} fontWeight={"400"} mt="-0.5rem" fontSize="0.8rem">Esqueci minha senha</Link>
        <Stack spacing={6} align={"center"}>
          <Button
						w="50%"
						h="4rem"
            type="submit"
            color={'white'}
            bgColor={'blue.500'}
            _hover={{
              bgColor: 'blue',
              opacity: 0.5,
            }}
            _active={{
              bgColor: 'blue.300',
            }}
            variant={'solid'}
          >
            Entrar
          </Button>
					<Link href="#" alignSelf={"center"} color={"#5f748b"} textDecor={"underline"} fontWeight={"400"} mt="-1rem" fontSize="0.8rem">ENTRAR COM GOOGLE</Link>

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

    </Flex>
  );
}
