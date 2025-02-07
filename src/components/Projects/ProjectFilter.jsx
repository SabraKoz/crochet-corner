import { Box, Select, Text } from "@radix-ui/themes"

export const ProjectFilter = ({ allTypes, allLevels, setSelectType, setSelectLevel }) => {
    return (
        <Box style={{ display: "flex", justifyContent: "space-evenly", padding: "20px" }}>
            <Box>
                <Text size="3" m="1">Search Project Type: </Text>
                <Select.Root
                    defaultValue="all"
                    onValueChange={(value) => setSelectType(value === "all" ? null : value)}>
                    <Select.Trigger />
                    <Select.Content>
                        <Select.Group>
                            <Select.Item value="all">Select Type</Select.Item>
                            {allTypes.map(type => {
                                return (<Select.Item value={type.id} key={type.id}>{type.name}</Select.Item>)
                            })}
                        </Select.Group>
                    </Select.Content>
                </Select.Root>
            </Box>

            <Box>
                <Text size="3" m="1">Search Project Difficulty: </Text>
                <Select.Root
                    defaultValue="all"
                    onValueChange={(value) => setSelectLevel(value === "all" ? null : value)}>
                    <Select.Trigger />
                    <Select.Content>
                        <Select.Group>
                            <Select.Item value="all">Select Level</Select.Item>
                            {allLevels.map(level => {
                                return (<Select.Item value={level.id} key={level.id}>{level.name}</Select.Item>)
                            })}
                        </Select.Group>
                    </Select.Content>
                </Select.Root>
            </Box>
        </Box>
    )
}