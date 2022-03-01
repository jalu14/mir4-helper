import { Flex, Input, InputGroup, InputLeftElement, InputRightElement, Kbd, Stack, Text } from "@chakra-ui/react";
import { Link as RRDLink } from "react-router-dom";

export const Navbar = () => {
    return (
        <Flex py="4" px={["4", "4", "4", "4", "15%"]}>
            <DesktopNav />
        </Flex>
    )
}

const DesktopNav = () => {
    return (
        <Flex
            w="100%"
            position="relative"
            userSelect="none"
            justifyContent="center"
            alignItems="center">

            <Stack
                direction="row"
                flexGrow={1}
                width="100%"
                spacing="16">
                <DesktopLink text="Map" link="map" />
                <DesktopLink text="Items" link="items" />
                <DesktopLink text="Monsters" link="monsters" />
            </Stack>

            <DesktopHeading />

            <Stack
                direction="row"
                spacing="16"
                flexGrow={1}
                alignItems="items"
                justifyContent="flex-end"
                width="100%"
                ml="20">
                <InputGroup maxW="60%" display={["none", "none", "none", "block"]}>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<i className="bx bx-search" />}
                    />
                    <Input variant="filled" placeholder="Search..." />
                    <InputRightElement
                        right={8}
                        pointerEvents='none'
                        children={
                            <Stack direction="row">
                                <Kbd>alt</Kbd>
                                <Text>+</Text>
                                <Kbd>K</Kbd>
                            </Stack>}>
                    </InputRightElement>
                </InputGroup>
                <DesktopLink text="Extras" link="extras" />
            </Stack>

        </Flex>
    )
}

const DesktopLink = ({ text, link }) => {
    return (
        <RRDLink to={link} style={{display: 'flex'}}>
            <Text
                p={2}
                fontSize="lg"
                borderRadius="lg"
                fontWeight={500}
                color="gray.200"
                _hover={{
                    textDecoration: 'none',
                    background: "gray.600",
                    color: "white",
                }}>
                {text}
            </Text>
        </RRDLink>
    )
}

const DesktopHeading = () => {
    return (
        <RRDLink to="/" style={{display: 'flex'}}>
            <Text
                p={2}
                fontSize="xl"
                borderRadius="lg"
                fontWeight={500}
                color="gray.200"
                _hover={{
                    textDecoration: 'none',
                }}>
                M4H
            </Text>
        </RRDLink>
    )
}