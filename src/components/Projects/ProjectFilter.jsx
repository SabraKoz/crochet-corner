import { Box, Text } from "@radix-ui/themes"

export const ProjectFilter = ({ allTypes, allLevels, setSelectType, setSelectLevel }) => {
    return (
        <Box style={{ display: "flex", justifyContent: "space-evenly", padding: "20px"}}>
            <Box>
                <Text size="3">Search Project Type: </Text>
                <select onChange={(event) => setSelectType(event.target.value)}>
                    <option value="">Select Type</option>
                    {allTypes.map(type => {
                        return (<option value={type.id} key={type.id}>{type.name}</option>)
                    })}
                </select>
            </Box>

            <Box>
                <Text size="3">Search Project Difficulty: </Text>
                <select onChange={(event) => setSelectLevel(event.target.value)}>
                    <option value="">Select Level</option>
                    {allLevels.map(level => {
                        return (<option value={level.id} key={level.id}>{level.name}</option>)
                    })}
                </select>
            </Box>
        </Box>
    )
}