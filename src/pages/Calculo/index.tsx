import { useEffect, useState } from "react"

import { Input } from "./Input"

import './styles.scss'

const initial = {
	oe_esf: '1.0',
	oe_cil: '',
	oe_eix: '',
	oe_dnp: '32.5',

	od_esf: '0.5',
	od_cil: '-1.5',
	od_eix: '',
	od_dnp: '33',

	aro: '55',
	pon: '16',
	diagMaior: '56',

	espMinLen: '1.5',
	indMol: '1.53',
	indMat: '1.601'
}

const curvaBasePadroes: { valor: number, arredondado: number }[] = []
let curvaBaseValor = 0

do {
	curvaBasePadroes.push({
		valor: curvaBaseValor,
		arredondado: Math.trunc(curvaBaseValor * 100) / 100
	})

	curvaBaseValor = curvaBasePadroes[curvaBasePadroes.length - 1].valor + 0.125
} while(curvaBaseValor < 20)

export function Calculos() {
	const [esEsf, setEsEsf] = useState<number|null>(initial?.oe_esf ? Number(initial?.oe_esf) : null)
	const [esCil, setEsCil] = useState<number|null>(initial?.oe_cil ? Number(initial?.oe_cil) : null)
	const [esEix, setEsEix] = useState<number|null>(initial?.oe_eix ? Number(initial?.oe_eix) : null)
	const [esDNP, setEsDNP] = useState<number|null>(initial?.oe_dnp ? Number(initial?.oe_dnp) : null)

	const [diEsf, setDiEsf] = useState<number|null>(initial?.od_esf ? Number(initial?.od_esf) : null)
	const [diCil, setDiCil] = useState<number|null>(initial?.od_cil ? Number(initial?.od_cil) : null)
	const [diEix, setDiEix] = useState<number|null>(initial?.od_eix ? Number(initial?.od_eix) : null)
	const [diDNP, setDiDNP] = useState<number|null>(initial?.od_dnp ? Number(initial?.od_dnp) : null)
	
	const [aro, setAro] = useState<number|null>(initial?.aro ? Number(initial?.aro) : null)
	const [pon, setPon] = useState<number|null>(initial?.pon ? Number(initial?.pon) : null)
	const [diag, setDiag] = useState<number|null>(initial?.diagMaior ? Number(initial?.diagMaior) : null)
	
	const [dia, setDia] = useState<number|null>(null)
	
	const [espMin, setEspMin] = useState<number|null>(initial?.espMinLen ? Number(initial?.espMinLen) : null)
	const [indMol, setIndMol] = useState<number|null>(initial?.indMol ? Number(initial?.indMol) : null)
	const [indMat, setIndMat] = useState<number|null>(initial?.indMat ? Number(initial?.indMat) : null)
	const [fatConv, setFatConv] = useState<number|null>(null)
	
	const [dioFatEsfEs, setDioFatEsfEs] = useState<number|null>(null)
	const [dioFatCilEs, setDioFatCilEs] = useState<number|null>(null)
	const [dioFatEsfDi, setDioFatEsfDi] = useState<number|null>(null)
	const [dioFatCilDi, setDioFatCilDi] = useState<number|null>(null)
	
	const [esEsfEquiv, setEsEsfEquiv] = useState<number|null>(null)
	const [diEsfEquiv, setDiEsfEquiv] = useState<number|null>(null)
	
	const [esCurBase, setEsCurBase] = useState<number|null>(null)
	const [diCurBase, setDiCurBase] = useState<number|null>(null)

	const [esCurBasePadrao, setEsCurBasePadrao] = useState<number|null>(null)
	const [diCurBasePadrao, setDiCurBasePadrao] = useState<number|null>(null)
	
	const [valVer, setValVer] = useState<number|null>(null)
	
	const [esCurReal, setEsCurReal] = useState<number|null>(null)
	const [diCurReal, setDiCurReal] = useState<number|null>(null)
	
	const [diEspMax, setDiEspMax] = useState<number|null>(null)
	const [esEspMax, setEsEspMax] = useState<number|null>(null)
	
	const [diD2, setDiD2] = useState<number|null>(null)
	const [esD2, setEsD2] = useState<number|null>(null)

	useEffect(() => {
		if(fatConv === null) {
			setDioFatEsfEs(null)
			setDioFatCilEs(null)
			setDioFatEsfDi(null)
			setDioFatCilDi(null)
			
			return
		}

		const esDioFatEsf = esEsf !== null ? fatConv * esEsf : null
		const esDioFatCil = esCil !== null ? fatConv * esCil : null
		const diDioFatEsf = diEsf !== null ? fatConv * diEsf : null
		const diDioFatCil = diCil !== null ? fatConv * diCil : null

		setDioFatEsfEs(esEsf !== null ? fatConv * esEsf : 0)
		
		setDioFatCilEs(esCil !== null ? fatConv * esCil : 0)
		
		setDioFatEsfDi(diEsf !== null ? fatConv * diEsf : 0)
		
		setDioFatCilDi(diCil !== null ? fatConv * diCil : 0)

		if(esDioFatEsf !== null) {
			setEsEsfEquiv(((esDioFatCil || 0) / 2) + esDioFatEsf)
		} else {
			setEsEsfEquiv(null)
		}

		if(diDioFatEsf !== null) {
			setDiEsfEquiv(((diDioFatCil || 0) / 2) + diDioFatEsf)
		} else {
			setDiEsfEquiv(null)
		}
	}, [esCil, diEsf, esEsf, diCil, fatConv])

	useEffect(() => {
		if(aro && pon && diag && esDNP && diDNP) {
			const minDNP = Math.min(esDNP, diDNP)

			const result = aro + pon - (2 * minDNP) + diag

			setDia(result)
		} else {
			setDia(null)
		}
	}, [aro, pon, diag, esDNP, diDNP])

	useEffect(() => {
		if(indMol && indMat) {
			const fator = ((indMol - 1) * 1000) / ((indMat - 1) * 1000)
			const valorVerdadeiro = ((indMat - 1) * 1000) / ((indMol - 1) * 1000)

			setFatConv(fator)
			setValVer(valorVerdadeiro)
		} else {
			setFatConv(null)
		}
	}, [indMol, indMat])

	useEffect(() => {
		setDiCurBase(((diEsfEquiv || 0) / 2) + 6)

		setEsCurBase(((esEsfEquiv || 0) / 2) + 6)
	}, [diEsfEquiv, esEsfEquiv])

	useEffect(() => {
		if(esCurBase) {
			let curvaPadraoEsq = 0

			for(const { arredondado } of curvaBasePadroes) {
				if(esCurBase < arredondado) {
					setEsCurBasePadrao(curvaPadraoEsq)
					break
				}

				curvaPadraoEsq = arredondado
			}
		}

		if(diCurBase) {
			let curvaPadraoDir = 0

			for(const { arredondado } of curvaBasePadroes) {
				if(diCurBase < arredondado) {
					setDiCurBasePadrao(curvaPadraoDir)
					break
				}

				curvaPadraoDir = arredondado
			}
		}

		if(valVer && esCurBasePadrao) {
			setEsCurReal(valVer * esCurBasePadrao)
		}

		if(valVer && diCurBasePadrao) {
			setDiCurReal(valVer * diCurBasePadrao)
		}
	}, [esCurBase, diCurBase, valVer])
	
	useEffect(() => {
		if(dia && indMat && espMin && esEsf && diEsf) {
			const espMaximaEsq = esEsf * Math.pow(dia / 2, 2) / (2000 * (indMat - 1)) + espMin
			const espMaximaDir = diEsf * Math.pow(dia / 2, 2) / (2000 * (indMat - 1)) + espMin

			setDiEspMax(espMaximaDir)
			setEsEspMax(espMaximaEsq)
		}
	}, [dia, indMat, espMin, esEsf, diEsf])

	useEffect(() => {
		if(esEsf && diEsf && esCurReal && diCurReal && diEspMax && esEspMax && indMat && valVer) {
			const diEsq = esEsf - (esCurReal / (1 - esCurReal * (esEspMax / (1000 * indMat))))
			const diDir = diEsf - (diCurReal / (1 - diCurReal * (diEspMax / (1000 * indMat))))

			setEsD2(Math.abs(diEsq / valVer))
			setDiD2(Math.abs(diDir / valVer))
		}
	}, [esEsf, diEsf, esCurReal, diEspMax, esEspMax, indMat, valVer])

	return (
		<div>
			<h1>Surfaçagem</h1>

			<h2>Olho direito</h2>

			<div className="dioptria direito">
				<Input 
					onChange={setDiEsf} 
					name="od_esf"
					label="Esférico"
					initialValue={initial?.od_esf}
				/>

				<Input 
					onChange={setDiCil} 
					name="od_cil"
					label="Cilíndrico"
					initialValue={initial?.od_cil}
				/>

				<Input 
					onChange={setDiEix} 
					name="od_eix"
					label="Eixo"
				/>

				<Input 
					onChange={setDiDNP} 
					name="oe_dnp"
					label="DNP direito"
					initialValue={initial?.od_dnp}
				/>
			</div>

			<h2>Olho esquerdo</h2>

			<div className="dioptria esquerdo">
				<Input 
					onChange={setEsEsf} 
					name="oe_esf"
					label="Esférico"
					initialValue={initial?.oe_esf}
				/>

				<Input 
					onChange={setEsCil} 
					name="oe_cil"
					label="Cilíndrico"
					initialValue={initial?.oe_cil}
				/>

				<Input 
					onChange={setEsEix} 
					name="oe_eix"
					label="Eixo"
				/>

				<Input 
					onChange={setEsDNP} 
					name="od_dnp"
					label="DNP esquerdo"
					initialValue={initial?.oe_dnp}
				/>
			</div>

			<h2>Armação</h2>

			<div className="medidas direito">
				<Input 
					onChange={setAro} 
					name="od_aro"
					label="Aro"
					initialValue={initial.aro}
				/>

				<Input 
					onChange={setPon} 
					name="od_pon"
					label="Ponte"
					initialValue={initial.pon}
				/>

				<Input 
					onChange={setDiag} 
					name="od_dia"
					label="Diagonal maior"
					initialValue={initial.diagMaior}
				/>

				{dia && (
					<strong>{`Ø = ${dia.toFixed(2)}mm`}</strong>
				)}
			</div>

			<h2>Lente</h2>

			<div className="medidas direito">
				<Input 
					onChange={setEspMin} 
					name="od_esp_min"
					label="Espessura mínima"
					initialValue={initial.espMinLen}
				/>

				<Input 
					onChange={setIndMol} 
					name="od_ind_mol"
					label="Índice molde"
					initialValue={initial.indMol}
				/>

				<Input 
					onChange={setIndMat} 
					name="od_ind_mat"
					label="Índice material"
					initialValue={initial.indMat}
				/>

				{fatConv && (
					<strong>{`F.C. = ${(Math.trunc(fatConv * 1000) / 1000)}`}</strong>
				)}

				{valVer && (
					<strong>{`V.V. = ${(Math.trunc(valVer * 1000) / 1000)}`}</strong>
				)}
			</div>

			<h2>Dioptrias fatoradas</h2>

			<div className="dioptria">
				<table className="dioptria-fatorada">
					<thead>
						<tr>
							<th>Olho</th>
							<th>Esférico</th>
							<th>Cilíndrico</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>OD</td>
							<td>{dioFatEsfDi !== null ? `${dioFatEsfDi > 0 ? '+' : ''}${dioFatEsfDi.toFixed(2)}` : ''}</td>
							<td>{dioFatCilDi !== null ? `${dioFatCilDi > 0 ? '+' : ''}${dioFatCilDi.toFixed(2)}` : ''}</td>
						</tr>
						<tr>
							<td>OE</td>
							<td>{dioFatEsfEs !== null ? `${dioFatEsfEs > 0 ? '+' : ''}${dioFatEsfEs.toFixed(2)}` : ''}</td>
							<td>{dioFatCilEs !== null ? `${dioFatCilEs > 0 ? '+' : ''}${dioFatCilEs.toFixed(2)}` : ''}</td>
						</tr>
					</tbody>
				</table>
			</div>

			<h2>Esférico equivalente</h2>

			<div className="dioptria">
				<table className="esferico-equivalente">
					<thead>
						<tr>
							<th>Olho</th>
							<th>Esférico equivalente</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>OD</td>
							<td>{diEsfEquiv !== null ? `${diEsfEquiv > 0 ? '+' : ''}${diEsfEquiv.toFixed(2)}` : ''}</td>
						</tr>
						<tr>
							<td>OE</td>
							<td>{esEsfEquiv !== null ? `${esEsfEquiv > 0 ? '+' : ''}${esEsfEquiv.toFixed(2)}` : ''}</td>
						</tr>
					</tbody>
				</table>
			</div>

			<h2>Curva base nominal</h2>

			<div className="dioptria">
				<table className="curva-base">
					<thead>
						<tr>
							<th>Olho</th>
							<th>Curva base</th>
							<th>Padrão mercado</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>OD</td>
							<td>{diCurBase?.toFixed(2) || ''}</td>
							<td>{diCurBasePadrao?.toFixed(2) || ''}</td>
						</tr>
						<tr>
							<td>OE</td>
							<td>{esCurBase?.toFixed(2) || ''}</td>
							<td>{esCurBasePadrao?.toFixed(2) || ''}</td>
						</tr>
					</tbody>
				</table>
			</div>

			<h2>Curva base real</h2>

			<div className="dioptria">
				<table className="curva-base">
					<thead>
						<tr>
							<th>Olho</th>
							<th>Curva base real</th>
							<th>Espessura máxima</th>
							<th>D2</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>OD</td>
							<td>{diCurReal?.toFixed(3) || ''}</td>
							<td>{diEspMax ? `${Math.trunc(diEspMax * 100) / 100}mm` : ''}</td>
							<td>{diD2 ? `${diD2?.toFixed(1)}mm` : ''}</td>
						</tr>
						<tr>
							<td>OE</td>
							<td>{esCurReal?.toFixed(3) || ''}</td>
							<td>{esEspMax ? `${Math.trunc(esEspMax * 100) / 100}mm` : ''}</td>
							<td>{esD2 ? `${esD2?.toFixed(1)}mm` : ''}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}
