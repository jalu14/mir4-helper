import { Box } from "@chakra-ui/react"
import { IItem } from "../../interfaces"

export const Item = (item: IItem) => {
    return (
        <Box>
            {item.name}
        </Box>
    )
}