const articlesData = {
    "sovereign-cloud": `
        <h1>Microsoft Sovereign Cloud in Deutschland: Architektur, Compliance & Delos Cloud</h1>
        <p><strong>Autor:</strong> Gregor Otto Huber | <strong>Datum:</strong> 2026-10-24</p>
        <hr style="border-color: #002b11; margin: 15px 0 25px 0;">
        
        <h2>Einleitung</h2>
        <p>Die Anforderungen an die digitale Souveränität des öffentlichen Sektors und stark regulierter Branchen (Banken, Versicherungswesen, Gesundheitswesen) in Deutschland haben sich in den letzten Jahren drastisch verschärft. Mit dem Vormarsch von Cloud-Native-Architekturen und KI-Workloads stehen IT-Entscheider vor dem klassischen Zielkonflikt: Wie lässt sich die Innovationsgeschwindigkeit hyperskalierbarer Cloud-Plattformen nutzen, ohne die Kontrolle über sensible Daten, kryptografische Schlüssel und rechtliche Zugriffsrisiken (z. B. US Cloud Act) abzugeben?</p>
        <p>Microsoft begegnet dieser Herausforderung in Deutschland mit einer mehrschichtigen Souveränitätsstrategie, deren Speerspitze die <strong>Microsoft Cloud for Sovereignty</strong> sowie das Ökosystem rund um die <strong>Delos Cloud</strong> bildet.</p>

        <h2>1. Die Säulen der Microsoft Cloud for Sovereignty</h2>
        <p>Die Microsoft Cloud for Sovereignty ist kein separates, physisch isoliertes Rechenzentrum, sondern eine Architektur- und Governance-Schicht, die auf bestehenden Azure-Regionen (wie <em>Germany West Central</em> in Frankfurt) aufbaut. Sie basiert auf drei zentralen Pfeilern:</p>
        <ul>
            <li><strong>Souveräne Guardrails & Landing Zones:</strong> Über spezialisierte <em>Sovereign Landing Zone (SLZ)</em> Templates werden Azure Policy-Initiativen automatisiert ausgerollt. Diese verhindern präventiv, dass Daten Regionen außerhalb Deutschlands/der EU verlassen oder nicht-konforme Dienste bereitgestellt werden.</li>
            <li><strong>Transparenz und operative Kontrolle:</strong> Kunden erhalten tiefen Einblick in den Betrieb der Infrastruktur. Dazu gehören Customer Lockbox (manuelle Freigabe, falls ein Microsoft-Ingenieur für Supportzwecke temporären Zugriff benötigt) und privilegierte Zugriffskontrollen.</li>
            <li><strong>Kryptografische Souveränität:</strong> Über <em>Double Key Encryption (DKE)</em> oder <em>Customer-Managed Keys (CMK)</em> behält der Kunde die alleinige Kontrolle über die Schlüssel. Selbst wenn Microsoft rechtlich zur Herausgabe von Daten gezwungen würde, blieben diese ohne den beim Kunden liegenden Schlüssel unlesbar.</li>
        </ul>

        <h2>2. Delos Cloud: Die souveräne Plattform für die öffentliche Verwaltung</h2>
        <p>Ein essenzieller Baustein für den deutschen Bundes-, Landes- und Kommunalsektor ist die <strong>Delos Cloud</strong>. Als deutscher IT-Dienstleister betreibt Delos Cloud eine vollständig souveräne Microsoft-Cloud-Plattform für die öffentliche Verwaltung in Deutschland.</p>
        <ul>
            <li><strong>Betriebshoheit:</strong> Der Betrieb erfolgt durch Personal mit Sicherheitsüberprüfung vor Ort in Deutschland.</li>
            <li><strong>Geheimschutz & BSI-Compliance:</strong> Die Infrastruktur ist darauf ausgelegt, die strengen Vorgaben des Bundesamtes für Sicherheit in der Informationstechnik (BSI) sowie IT-Grundschutz und Geheimschutzstandards zu erfüllen.</li>
            <li><strong>Neuartiges Partner-Modell:</strong> Delos Cloud nutzt die IP und Technologie von Microsoft, fungiert aber als rechtlich und operativ unabhängiger Betreiber.</li>
        </ul>

        <h2>3. Technische Umsetzung: Confidential Computing</h2>
        <p>Das technische Fundament für echte Datensouveränität in der Cloud bildet <strong>Confidential Computing</strong>. Während Verschlüsselung <em>at rest</em> (AES-256) und <em>in transit</em> (TLS 1.3) längst Standard sind, schützt Confidential Computing Daten <strong>in use</strong> – also während sie im Arbeitsspeicher verarbeitet werden.</p>
        <p>Durch hardwarebasierte Trusted Execution Environments (TEEs) wie <strong>AMD SEV-SNP</strong> oder <strong>Intel SGX</strong> werden Speicherbereiche kryptografisch isoliert. Weder das Host-Betriebssystem noch der Hypervisor von Azure oder ein Administrator haben Einblick in den Klartext-Arbeitsspeicher der virtuellen Maschine.</p>

<pre>+------------------------------------------------------------------+
|                   Anwendungs-Code & Sensitive Daten              |
|                   (In kryptografisch isolierter Enklave)        |
+------------------------------------------------------------------+
                                  |
            [ Hardware-Verschlüsselung im RAM (AMD SEV) ]
                                  v
+------------------------------------------------------------------+
|          Untrusted Host / Azure Hypervisor / OS Administrator    |
|                     (Kein Zugriff auf Klartext)                  |
+------------------------------------------------------------------+</pre>

        <h2>Fazit & Ausblick</h2>
        <p>Souveränität in der Cloud ist kein binärer Zustand, sondern ein Spektrum. Unternehmen und Behörden müssen für jede Anwendung den passenden Mix aus Compliance, Kosten und Funktionalität wählen. Mit der Kombination aus BSI-konformen Azure Landing Zones, Confidential Computing und Partner-Modellen wie der Delos Cloud zeigt sich, dass höchste Sicherheitsanforderungen und moderne Cloud-Architekturen in Deutschland kein Widerspruch mehr sein müssen.</p>
    `,

    "keyvault-powerplatform": `
        <h1>Azure Key Vault Integration in Microsoft Power Platform: Enterprise Secrets Management</h1>
        <p><strong>Autor:</strong> Gregor Otto Huber | <strong>Datum:</strong> 2026-10-18</p>
        <hr style="border-color: #002b11; margin: 15px 0 25px 0;">

        <h2>Einleitung</h2>
        <p>Die Microsoft Power Platform ermöglicht es Fachabteilungen und Entwicklern (Citizen & Professional Developers), innerhalb kürzester Zeit Geschäftsanwendungen und Automatisierungen mit Power Apps und Power Automate zu erstellen. Im Unternehmensumfeld (Enterprise Context) entsteht dabei jedoch schnell eine kritische Sicherheitslücke: <strong>Secret Sprawl</strong>.</p>
        <p>Oft werden Datenbank-Passwörter, API-Keys, OAuth-Tokens oder Verbindungskennwörter hartkodiert in Flows, Apps oder Umgebungsvariablen hinterlegt. Wechselt ein Passwort oder läuft ein Zertifikat ab, müssen Dutzende Automatisierungen manuell angepasst werden – ganz zu schweigen vom immensen Sicherheitsrisiko bei unbeabsichtigter Offenlegung. Die Lösung: Die nahtlose Einbindung des <strong>Azure Key Vault</strong> über verwaltete Umgebungsvariablen (Environment Variables).</p>

        <h2>1. Die Architektur: Wie Power Platform auf Azure Key Vault zugreift</h2>
        <p>Anstatt Geheimnisse im Klartext in der Power Platform Dataverse-Datenbank zu speichern, nutzt die Enterprise-Architektur Umgebungsvariablen vom Typ <em>Data Source / Secret</em>, die dynamisch auf ein Geheimnis im Azure Key Vault verweisen.</p>

<pre>[ Power Apps / Power Automate Flow ]
                 |
                 v (Liest Umgebungsvariable)
     [ Dataverse Environment Variable ]
                 |
                 v (Verwendet Azure Resource Manager / Managed Identity)
       [ Azure Key Vault Secret ]</pre>

        <p>Wenn ein Power Automate Flow ausgeführt wird, fragt Dataverse den aktuellen Wert des Secrets zur Laufzeit sicher über die Azure-Schnittstelle ab. Das Geheimnis verbleibt im Key Vault und wird nie dauerhaft in der Power Platform gespeichert.</p>

        <h2>2. Schritt-für-Schritt Einrichtung im Enterprise-Umfeld</h2>
        <h2>Schritt 1: Azure Key Vault vorbereiten</h2>
        <ul>
            <li>Erstelle einen Azure Key Vault in deiner Azure Landing Zone.</li>
            <li>Aktiviere die Zugriffssteuerung (RBAC) oder erstelle eine <strong>Access Policy</strong>.</li>
            <li>Speichere das Geheimnis (z. B. <code>SQL-DB-ConnectionString</code> oder <code>SAP-API-Key</code>).</li>
        </ul>

        <h2>Schritt 2: Dienstprinzipal / Managed Identity berechtigen</h2>
        <p>Damit Dataverse auf den Key Vault zugreifen darf, muss der Microsoft Power Platform Resource Provider berechtigt werden:</p>
        <ul>
            <li><strong>App Name:</strong> Power Platform Resource Provider</li>
            <li><strong>Application ID:</strong> <code>782b5317-09d3-4a1a-a034-2e23f05f778a</code></li>
            <li><strong>Rolle / Recht:</strong> <code>Key Vault Secrets User</code> (Leserecht für Geheimnisse).</li>
        </ul>

        <h2>Schritt 3: Umgebungsvariable in der Power Platform Solution anlegen</h2>
        <ul>
            <li>Erstelle in deiner Power Apps / Power Automate Solution eine neue Umgebungsvariable.</li>
            <li>Wähle als Datentyp <strong>Geheimnis (Secret)</strong>.</li>
            <li>Wähle als Secret Store <strong>Azure Key Vault</strong>.</li>
            <li>Gib Subscription ID, Resource Group, Key Vault Name und Secret Name an.</li>
        </ul>

        <h2>3. Best Practices & Sicherheits-Guardrails</h2>
        <ul>
            <li><strong>Keine Klartext-Logs in Power Automate:</strong> Aktiviere bei allen Aktionen, die das Key-Vault-Geheimnis verarbeiten, in den Einstellungen die Option <strong>Secure Inputs</strong> und <strong>Secure Outputs</strong>.</li>
            <li><strong>ALM & Environment Strategy:</strong> Nutze für Dev-, Test- und Prod-Umgebungen unterschiedliche Key Vaults. Beim Deployment der Solution über Power Platform Pipelines wird lediglich die Zuordnung angepasst – der Code bleibt unberührt.</li>
            <li><strong>Secret Rotation automatisieren:</strong> Nutze Azure Event Grid, um ablaufende Schlüssel im Key Vault automatisch zu rotieren – ohne Ausfallzeit für die Anwendung.</li>
        </ul>

        <h2>Fazit</h2>
        <p>Die Integration von Azure Key Vault in die Power Platform bildet die Brücke zwischen agiler Low-Code-Entwicklung und strengen Enterprise-Cybersecurity-Vorgaben. Sie verhindert Hartkodierung, zentralisiert das Auditing und sorgt für ein sauberes Application Lifecycle Management (ALM).</p>
    `,

    "landing-zones": `
        <h1>Automated Azure Landing Zones & Policy-as-Code Frameworks</h1>
        <p><strong>Autor:</strong> Gregor Otto Huber | <strong>Datum:</strong> 2026-10-05</p>
        <hr style="border-color: #002b11; margin: 15px 0 25px 0;">

        <h2>Einleitung</h2>
        <p>Wenn Unternehmen ihre Cloud-Transformation von einzelnen Pilotprojekten auf hunderte Workloads skalieren, gerät die manuelle Verwaltung von Azure-Subskriptionen schnell an ihre Grenzen. Das Ergebnis sind Wildwuchs, unklare Sicherheitsgrenzen, explodierende Kosten und fehlende Transparenz.</p>
        <p>Das <strong>Microsoft Cloud Adoption Framework (CAF)</strong> adressiert dieses Problem mit dem Konzept der <strong>Azure Landing Zones</strong>. Eine Landing Zone ist die Architektur-Grundlage: eine gut strukturierte, konfigurierte Multi-Subscription-Umgebung, die Sicherheit, Governance, Networking und Identitätsmanagement zentral bereitstellt.</p>

        <h2>1. Das Management-Gruppen-Modell (Hierarchie)</h2>
        <p>Eine Enterprise Landing Zone basiert auf einer durchdachten Hierarchie von Management Groups (MGs). Dadurch können Richtlinien (Azure Policies) und Zugriffsrechte (RBAC) vererbt werden.</p>
        <ul>
            <li><strong>Tenant Root Group:</strong> Die oberste Ebene (global).</li>
            <li><strong>Platform Management Group:</strong> Zentrale Dienste (Identity, Log Analytics Workspace, Sentinel, Hub VNet, Azure Firewall).</li>
            <li><strong>Landing Zones Group:</strong> Für Anwendungs-Workloads (Corp mit interner Netzanbindung, Online mit DMZ/WAF, Confidential für erhöhte Souveränität).</li>
            <li><strong>Sandbox & Decommissioned:</strong> Testfelder mit strikten Ausgaben-Limits.</li>
        </ul>

        <h2>2. Infrastructure as Code (IaC) mit Terraform</h2>
        <p>Das manuelle Klicken im Azure Portal ist für Enterprise-Landing-Zones tabu. Das offizielle <strong>Azure Landing Zones Terraform Modul</strong> ermöglicht die automatische Erstellung dieser Struktur:</p>

<pre>module "enterprise_scale" {
  source  = "Azure/caf-enterprise-scale/azurerm"
  version = "6.0.0"

  default_location = "germanywestcentral"
  root_parent_id   = data.azurerm_client_config.current.tenant_id
  root_id          = "contoso"
  root_name        = "Contoso Enterprise"

  deploy_core_landing_zones = true
  deploy_mgmt_network       = true
}</pre>

        <h2>3. Policy-as-Code: Automatische Guardrails durchsetzen</h2>
        <p>Anstatt nach der Bereitstellung von Ressourcen zu prüfen, ob diese sicher sind, setzen <strong>Azure Policies</strong> unumstößliche Leitplanken. Beispiele:</p>
        <ul>
            <li><strong>Allowed Locations:</strong> Verhindert das Erstellen von Ressourcen außerhalb von <code>germanywestcentral</code> und <code>westeurope</code>.</li>
            <li><strong>Require Tags:</strong> Blockiert die Erstellung von Ressourcen ohne Zuordnung von <code>Environment</code>, <code>Owner</code> und <code>CostCenter</code>.</li>
            <li><strong>Network Isolation:</strong> Erfordert die Nutzung von Private Endpoints und verbietet öffentliche IPs an Datenbanken.</li>
        </ul>

        <h2>Fazit</h2>
        <p>Automatisierte Azure Landing Zones schaffen das Fundament für agile Entwicklungsteams. Sie ermöglichen es Entwicklern, innerhalb klar abgesteckter Sicherheitsgrenzen eigenständig Ressourcen bereitzustellen.</p>
    `,

    "confidential-computing": `
        <h1>Confidential Computing: Schutz von KI-Workloads und sensitiven Daten</h1>
        <p><strong>Autor:</strong> Gregor Otto Huber | <strong>Datum:</strong> 2026-09-28</p>
        <hr style="border-color: #002b11; margin: 15px 0 25px 0;">

        <h2>Einleitung</h2>
        <p>Mit dem rasanten Einzug von generativer künstlicher Intelligenz (Large Language Models, LLMs) und fortschrittlicher Datenanalyse stehen Unternehmen vor einer neuen Hürde: Wie lassen sich hochsensible Geschäftsgeheimnisse, Patientendaten oder Finanzdaten in Cloud-basierten KI-Modellen verarbeiten, ohne dass der Cloud-Anbieter oder Dritte Einblick in die Prompts und Trainingsdaten erhalten?</p>
        <p>Die Antwort liegt in <strong>Confidential Computing</strong> und <strong>Confidential AI</strong>. Diese Technologien erweitern die klassische Datensicherheit um die Dimension der Verarbeitungssicherheit im RAM.</p>

        <h2>1. Das Drei-Säulen-Modell der Datenverschlüsselung</h2>
        <ul>
            <li><strong>Data at Rest:</strong> Verschlüsselung von Festplatten und Speicher (AES-256).</li>
            <li><strong>Data in Transit:</strong> Verschlüsselung von Netzwerktrends (TLS 1.3, IPsec).</li>
            <li><strong>Data in Use (Confidential Computing):</strong> Hardwarebasierte Verschlüsselung im Arbeitsspeicher (RAM) während der aktiven Berechnung.</li>
        </ul>

        <h2>2. Hardwarebasierte Enklaven</h2>
        <p>Confidential Computing basiert auf Hardware-Innovationen führender Prozessor-Hersteller:</p>
        <ul>
            <li><strong>AMD SEV-SNP:</strong> Verschlüsselt den gesamten Arbeitsspeicher einer virtuellen Maschine mit einem im Prozessor generierten Schlüssel.</li>
            <li><strong>Intel SGX / TDX:</strong> Erlaubt das Isolieren einzelner Code-Inseln oder ganzer VMs im Speicher.</li>
            <li><strong>NVIDIA H100 Confidential GPUs:</strong> Erweitert den Schutz erstmals auf GPU-beschleunigte KI-Workloads.</li>
        </ul>

        <h2>3. Remote Attestation: Vertrauen durch kryptografischen Beweis</h2>
        <p>Bevor eine Anwendung schnelle Daten in eine vertrauliche Enklave sendet, fordert sie einen beglaubigten Hardware-Echtheitsnachweis an. Nur wenn bestätigt wird, dass die VM auf echter Confidential-Hardware läuft und der geladene Code nicht manipuliert wurde, wird der Entschlüsselungsschlüssel freigegeben.</p>

        <h2>Fazit</h2>
        <p>Confidential Computing verändert die Spielregeln der Cloud-Sicherheit grundlegend. Es ermöglicht <strong>Zero-Trust-Architekturen</strong> im Arbeitsspeicher und ebnet den Weg für vertrauliche KI-Analysen und den Einsatz von Cloud-Ressourcen im hochregulierten Umfeld.</p>
    `
};