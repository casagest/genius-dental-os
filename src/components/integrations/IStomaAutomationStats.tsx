import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const IStomaAutomationStats = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Monitorizare și Raportare</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <p className="text-2xl font-bold text-green-600">245</p>
            <p className="text-sm text-green-700">Programări Sincronizate</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <p className="text-2xl font-bold text-blue-600">89</p>
            <p className="text-sm text-blue-700">Pacienți Actualizați</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg text-center">
            <p className="text-2xl font-bold text-purple-600">12</p>
            <p className="text-sm text-purple-700">Rapoarte Generate</p>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg text-center">
            <p className="text-2xl font-bold text-orange-600">156</p>
            <p className="text-sm text-orange-700">Facturi Procesate</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};