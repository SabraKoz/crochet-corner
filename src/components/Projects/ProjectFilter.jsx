export const ProjectFilter = ({ allTypes, allLevels, setSelectType, setSelectLevel }) => {
    return (
        <section className="project-filter">
            <div>
                <label className="info-title">Search Project Type: </label>
                <select className="select-dropdown" onChange={(event) => setSelectType(event.target.value)}>
                    <option value="">Select Type</option>
                    {allTypes.map(type => {
                        return (<option value={type.id} key={type.id}>{type.name}</option>)
                    })}
                </select>
            </div>

            <div>
                <label className="info-title">Search Project Difficulty: </label>
                <select className="select-dropdown" onChange={(event) => setSelectLevel(event.target.value)}>
                    <option value="">Select Level</option>
                    {allLevels.map(level => {
                        return (<option value={level.id} key={level.id}>{level.name}</option>)
                    })}
                </select>
            </div>
        </section>
    )
}