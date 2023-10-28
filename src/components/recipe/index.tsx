export default function Recipe({text}: any) {
    return (
        <>
        <h2 className="recipe-title">Receta</h2>
        <section className="recipe">
            <pre dangerouslySetInnerHTML={{__html: text}} />
        </section>
        </>
    )
}