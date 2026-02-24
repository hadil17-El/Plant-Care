import Link from "next/link";
import tips from "@/app/data/tips.json"
export default function TipsSection() {
    const previewTips = tips.slice(0,3); //

    return (
        <section className="tips-section">
                <div className="section-header">
                    <h2>Plant Care & Tips</h2>
                    <Link href="/tipsSeeAll" className="see-all">
                    See all
                    </Link>
                    <div className="tips-list">
                        {previewTips.map((tip)=> (
                            <Link
                            key={tip.slug}
                            href={`/tips/${tip.slug}`}
                            classNametip-card
                            >
                                <img src={tip.image} alt={tip.title} />
                                <div>
                                    <h2>{tip.title}</h2>
                                    <p>{tip.excerpt}</p>
                                    <span className="read-more">Read more</span>
                                </div>
                            </Link>
                        ))

                        }
                    </div>
                </div>
        </section>
    )
}