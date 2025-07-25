export const SpotCard = ({
                             name,
                             status,
                             code,
                         }: {
    name: string;
    status: string;
    code: string;
}) => (
    <div className="bg-white p-4 rounded-lg shadow-sm relative spot-card border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex justify-between">
            <div className="text-lg font-bold text-black">{name}</div>
            <div>{status}</div>
        </div>
        <div className="text-gray-500 text-sm">{code}</div>
    </div>
);