export default function GameContentAbout({ descriptions }: { descriptions?: string[] }) {
    return (
        <>
            <h3 className="text-xl font-bold">About This Game</h3>
            {descriptions?.map((description, index) => <p key={index}>{description}</p>)}

            <h3 className="pt-4 text-xl font-bold">System Requirements</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <h4 className="font-semibold">Minimum:</h4>
                    <ul className="space-y-1 text-sm">
                        <li>
                            <span className="font-medium">OS:</span> Windows 7 or newer
                        </li>
                        <li>
                            <span className="font-medium">Processor:</span> Intel Core i3-3210 or AMD A8-7600
                        </li>
                        <li>
                            <span className="font-medium">Memory:</span> 4 GB RAM
                        </li>
                        <li>
                            <span className="font-medium">Graphics:</span> NVIDIA GeForce GTX 750 Ti or AMD Radeon R7 265
                        </li>
                        <li>
                            <span className="font-medium">Storage:</span> 4 GB available space
                        </li>
                    </ul>
                </div>
                <div className="space-y-2">
                    <h4 className="font-semibold">Recommended:</h4>
                    <ul className="space-y-1 text-sm">
                        <li>
                            <span className="font-medium">OS:</span> Windows 10
                        </li>
                        <li>
                            <span className="font-medium">Processor:</span> Intel Core i5-4590 or AMD FX-8350
                        </li>
                        <li>
                            <span className="font-medium">Memory:</span> 8 GB RAM
                        </li>
                        <li>
                            <span className="font-medium">Graphics:</span> NVIDIA GeForce GTX 970 or AMD Radeon R9 290
                        </li>
                        <li>
                            <span className="font-medium">Storage:</span> 8 GB available space
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
