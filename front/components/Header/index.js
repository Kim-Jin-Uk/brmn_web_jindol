import Menu from "/components/Menu";

export default function Header(param) {
    return (
        <div style={{
            position: "sticky",
            top: "0px",
            zIndex: 1000,
        }}>
            <Menu param={param.param} openAble={param.openAble} setOpenAble={param.setOpenAble}/>
        </div>
    )
}
