import { Input, InputGroup, InputLeftElement, InputRightElement, Kbd, Stack, Text } from "@chakra-ui/react"
import { useEffect } from "react"

export const SearchBar = () => {

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);
        function onKeyDown(k) {
            if (k.altKey && k.key === 'k') {
                document.querySelector('input#search-input')?.focus();
            }
        }

        return () => {
            window.removeEventListener('keydown', onKeyDown);
        }
    }, []);

    return (
        <InputGroup maxW="60%" display={["none", "none", "none", "block"]}>
            <InputLeftElement
                pointerEvents='none'
                children={<i className="bx bx-search" />}
            />
            <Input id="search-input" variant="filled" placeholder="Search..." />
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
    )
}