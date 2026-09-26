package com.example.hmdback.Controllers;

import com.example.hmdback.Services.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final AssuranceService assuranceService;
    private final BibliothequeService bibliothequeService;
    private final OneService oneService;
    private final OnepService onepService;
    private final TelephoneService telephoneService;
    private final VoitureService voitureService;
    private final GasoilService gasoilService;
    private final PropreteService propreteService;
    private final ImpotsService impotsService;
    private final AccidentService accidentService;
    private final ReunionService reunionService;
    private final ReparationEcoleService reparationEcoleService;
    private final CreditService creditService;
    private final RevenuEspeceService revenuEspeceService;
    private final RevenuCompteService revenuCompteService;
    private final CnssService cnssService;
    private final EquipementEcoleService equipementService;
    private final ReparationService reparationService;
    private final PressonService pressonService;
    private final AssuranceVoitureService assuranceVoitureService;
    private final RevenusService revenusService;
    private final PartageBeneficeService partageBeneficeService;

    public DashboardController(
            AssuranceService assuranceService,
            BibliothequeService bibliothequeService,
            OneService oneService,
            OnepService onepService,
            TelephoneService telephoneService,
            VoitureService voitureService,
            GasoilService gasoilService,
            PropreteService propreteService,
            ImpotsService impotsService,
            AccidentService accidentService,
            ReunionService reunionService,
            ReparationEcoleService reparationEcoleService,
            CreditService creditService,
            RevenuEspeceService revenuEspeceService,
            RevenuCompteService revenuCompteService,
            EquipementEcoleService equipementService,
            ReparationService reparationService,
            PressonService pressonService,
            AssuranceVoitureService assuranceVoitureService,
            CnssService cnssService,
            RevenusService revenusService,
            PartageBeneficeService partageBeneficeService
    ) {
        this.assuranceService = assuranceService;
        this.bibliothequeService = bibliothequeService;
        this.oneService = oneService;
        this.onepService = onepService;
        this.telephoneService = telephoneService;
        this.voitureService = voitureService;
        this.gasoilService = gasoilService;
        this.propreteService = propreteService;
        this.impotsService = impotsService;
        this.accidentService = accidentService;
        this.reunionService = reunionService;
        this.reparationEcoleService = reparationEcoleService;
        this.creditService = creditService;
        this.revenuEspeceService = revenuEspeceService;
        this.revenuCompteService = revenuCompteService;
        this.equipementService = equipementService;
        this.reparationService = reparationService;
        this.pressonService = pressonService;
        this.assuranceVoitureService = assuranceVoitureService;
        this.cnssService = cnssService;
        this.revenusService = revenusService;
        this.partageBeneficeService = partageBeneficeService;
    }

    @GetMapping
    public Map<String, Object> getDashboardData() {
        Map<String, Object> data = new HashMap<>();

        // Assurances
        data.put("assurancesCount", assuranceService.getAllAssurances().size());
        data.put("assurancesTotalPrix", assuranceService.getTotalMontantPaiements());

        // Bibliothèques
        data.put("bibliothequesCount", bibliothequeService.getAllBibliotheques().size());
        data.put("bibliothequesTotalPrix", bibliothequeService.getTotalMontant());

        // ONE
        data.put("oneCount", oneService.getTotalCount());
        data.put("oneTotalPaiements", oneService.getTotalMontantPaiements());

        // ONEP
        data.put("onepCount", onepService.getTotalCount());
        data.put("onepTotalPaiements", onepService.getTotalMontantPaiements());

        // Téléphones
        data.put("telephonesCount", telephoneService.getTotalCount());
        data.put("telephonesTotalPaiements", telephoneService.getTotalMontantPaiements());

        // Voitures
        data.put("voituresCount", voitureService.getTotalCount());

        // Gasoil
        data.put("gasoilCount", gasoilService.getAll().size());
        data.put("gasoilTotal", gasoilService.getTotalMontant());

        // Propreté
        data.put("propreteCount", propreteService.getAll().size());
        data.put("propreteTotal", propreteService.calculerTotalPrix());

        // Impôts
        data.put("impotsCount", impotsService.getAllImpots().size());
        data.put("impotsTotal", impotsService.calculerTotalPrix());

        // Modules existants
        data.put("accidentsTotal", accidentService.getTotalMontant());
        data.put("reunionsTotal", reunionService.getTotalMontant());
        data.put("reparationsEcoleTotal", reparationEcoleService.getTotalMontant());
        data.put("creditsTotal", creditService.getTotalMontant());

        // Nouveaux modules
        data.put("equipementsTotal", equipementService.getTotalMontant());
        data.put("reparationsTotal", reparationService.getTotalMontant());
        data.put("pressonsTotal", pressonService.calculerTotalPaiements());
        data.put("assurancesVoituresTotal", assuranceVoitureService.getTotalAssurance());

        // CNSS
        data.put("cnssCount", cnssService.getAllCnss().size());
        data.put("cnssTotal", cnssService.getTotalMontant());

        // Revenus
        data.put("revenusEspecesTotal", revenuEspeceService.getTotalGeneral());
        data.put("revenusComptesTotal", revenuCompteService.getTotalGeneral());
        data.put("revenusTotal", revenuEspeceService.getTotalGeneral() + revenuCompteService.getTotalGeneral());

        // Revenus Bureau + Activités Parallèles + Reste Année Dernière
        data.put("revenusBureauActivitesTotal", revenusService.getTotalRevenusGlobal());

        // ✅ Partage Bénéfices
        data.put("partageBeneficesCount", partageBeneficeService.getAll().size());
        data.put("partageBeneficesTotal", partageBeneficeService.getTotalGeneral());

        return data;
    }
}
