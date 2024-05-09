import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	Image,
	Icon,
	Text,
} from '@chakra-ui/react';
import { BsMoon, BsSun } from 'react-icons/bs';
import { HiUser } from "react-icons/hi2";
import { ImExit } from "react-icons/im";
import { ScreenHome } from './Home';

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg={useColorModeValue('#0345BE', '#0345BE')} px={4} h="7rem">
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Image src="/Logos/dashboardLogo.png" maxH={"7rem"}/>

          <Flex alignItems={'center'}>
						<Button mr="1rem" h="3rem" bgColor="#0345BE" color="white" boxShadow={"black 0 0.25rem 0.25rem"}>
							<Image src="/Icons/erpIcon.png" maxH={"2rem"}/>

						</Button>


						
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
									<Button mr="1rem" h="3rem" bgColor="#0345BE" color="white" boxShadow={"black 0 0.25rem 0.25rem"}>
										<Icon as={HiUser} minW="1.9rem" minH="1.9rem"/>

									</Button>
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>

						<Button mr="1rem" h="3rem" bgColor="#0345BE" color="white" boxShadow={"black 0 0.25rem 0.25rem"}>
							<Icon as={ImExit} minW="1.9rem" minH="1.9rem"/>
							<Text as="p">Sair</Text>
						</Button>
            
						<Stack direction={'row'} spacing={7} >
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <BsMoon /> : <BsSun />}
              </Button>


            </Stack>
          </Flex>
        </Flex>
      </Box>
			<Box as="nav" h="5rem" >				
				<Tabs variant={"unstyled"}>
					<TabList bg="#0345BE" >
						<Tab h="4.5rem" w="10.4rem" color="white" _selected={{borderTop: "solid #00C93F 0.5rem"}}>Home</Tab>
						<Tab h="4.5rem" w="10.4rem" color="white" _selected={{borderTop: "solid #00C93F 0.5rem"}}>Empresa</Tab>
						<Tab h="4.5rem" w="10.4rem" color="white" _selected={{borderTop: "solid #00C93F 0.5rem"}}>Tarefas</Tab>
						<Tab h="4.5rem" w="10.4rem" color="white" _selected={{borderTop: "solid #00C93F 0.5rem"}}>Contabilidade</Tab>
						<Tab h="4.5rem" w="10.4rem" color="white" _selected={{borderTop: "solid #00C93F 0.5rem"}}>Folha</Tab>
						<Tab h="4.5rem" w="10.4rem" color="white" _selected={{borderTop: "solid #00C93F 0.5rem"}}>Honorários</Tab>
						<Tab h="4.5rem" w="10.4rem" color="white" _selected={{borderTop: "solid #00C93F 0.5rem"}}>Serviços Adicionais</Tab>
						<Tab h="4.5rem" w="10.4rem" color="white" _selected={{borderTop: "solid #00C93F 0.5rem"}}>Comercial</Tab>
					</TabList>

					<TabPanels>
						<TabPanel>
							<ScreenHome/>
						</TabPanel>
						<TabPanel>
							<p>two!</p>
						</TabPanel>
						<TabPanel>
							<p>three!</p>
						</TabPanel>
						<TabPanel>
							<p>four!</p>
						</TabPanel>
						<TabPanel>
							<p>five!</p>
						</TabPanel>
						<TabPanel>
							<p>six!</p>
						</TabPanel>
						<TabPanel>
							<p>seven!</p>
						</TabPanel>
						<TabPanel>
							<p>eight!</p>
						</TabPanel>
						
					</TabPanels>
				</Tabs>
			</Box>
    </>
  );
}